/*jslint node: true */
"use strict";

module.exports = function (options) {

  var
    _methods = {},
    _private = {},

    token = null,
    stack = [],
    messages_count = 0,

    _ = require('underscore'),
    messagelib = require('../../lib/messages.js')(options);

  _methods.list = function(request, reply) {

    token = request.auth.credentials.token;

    /** Fetches last 50 messages and preview the labels */
    messagelib.fetch(token, 50, _private._fetch);

    /** Resets */
    _private._reset();

    reply();
  };

  /** Sorts descending by value and filters by the middle value */
  _methods.filterStack = function(stack) {

    for(var element_key in stack) {
      var element = stack[element_key];

      var labels = element.labels;

      labels = _.sortBy(labels, 'value');
      labels = labels.reverse();

      var middle = labels[Math.round((labels.length - 1) / 2)];

      labels = _.filter(labels, function(label) {
        return (label.value >= middle.value)
      });

      stack[element_key].labels = labels;
    }

    return stack;
  };

  /** Merges stack with an object with correct type
   *
   * WE HAVE THIS EXAMPLE STACK
   *
   * [
   *  {
   *    "email": "example@.....",
   *    "labels": [{
   *      "name": "example",
   *      "value": 1
   *    },
   *    {
   *      "name": "example 2",
   *      "value": 1
   *    },
   *    {
   *      "name": "example3",
   *      "value": 2
   *    }
   *    ]
   *  },
   *  {
   *    "email": "example2@.....",
   *    "labels": [{
   *      "name": "example",
   *      "value": 1
   *    },
   *    {
   *      "name": "example 2",
   *      "value": 1
   *    },
   *    {
   *      "name": "example3",
   *      "value": 2
   *    }
   *    ]
   *  }
   * ]
   *
   * IT WILL BE MERGED WITH THIS OBJECT
   *
   *    {
   *      "email": "example@.....",
   *      "labels": [{
   *        "name": "example",
   *        "value": 1
   *    },
   *    {
   *      "name": "example 2",
   *      "value": 1
   *    },
   *    {
   *      "name": "example3",
   *      "value": 1
   *    }
   *    ]
   *  }
   *
   */
  _methods.mergeStack = function(stack, element) {

    var _ef = false;

    for(var stack_key in stack) {
      var _el = stack[stack_key];

      if(_el.email == element.email) {

        var _labels = _el.labels;
        var labels = element.labels;

        for(var label_key in labels) {

          var label = labels[label_key];
          var _f = false;

          for(var _label_key in _labels) {
            var _label = labels[_label_key];

            if(label.name == _label.name) {
              stack[stack_key].labels[_label_key].value = (_label.value+label.value);
              _f = true;
              break;
            }
          }

          if(_f == false) {
            stack[stack_key].labels.push(label);
          }
        }

        _ef = true;
      }
    }

    if(_ef == false) {
      stack.push(element);
    }

    return stack;
  };

  _private._pushConsoleResponse = function(stack)
  {
    console.log("\r\n");
    console.log("Result");
    console.log("==========================");
    for(var element_key in stack) {
      var element = stack[element_key];

      var _label_string = [];

      var labels = element.labels;
      for(var label_key in labels) {
        var label = labels[label_key];

        _label_string.push(label.name + "(" + label.value + ")");
      }

      console.log(element.email + ' - [' + _label_string.join(", ") + ']')
    }

    _private._reset();
  };

  _private._reset = function() {
    token = null, stack = [], messages_count = 0;
  };

  /** Handles messagelib read response */
  _private._read = function(error, message) {

    messages_count--;

    if(error || message == null) {

      /** If the last iteration is an error - force push current stack */
      if(messages_count == 0) {
        _private._pushConsoleResponse(_methods.filterStack(stack));
      }

      console.log(error);
      return;
    }

    message = message.messages[0];

    var headerParser = messagelib.parse.header;

    /** Merges stack */
    stack = _methods.mergeStack(stack, {

      /** Gets the email sender */
      "email": headerParser.from(message),

      /** Gets email label to value pair {name: label, value: 1} */
      "labels": headerParser.label2ValuePair(message)
    });

    if(messages_count == 0) {
      _private._pushConsoleResponse(_methods.filterStack(stack));
    }

  };

  /** Handles messagelib fetch response */
  _private._fetch = function(error, response) {

    if (error) {
      console.log('Fetch error: ' + error);
      return;
    }

    var messages = response.messages;

    messages_count = messages.length;

    for(var message_key in messages) {

      /** Gets message ID */
      var id = messages[message_key].id;

      /** Reads message by ID */
      messagelib.read(token, id, _private._read);
    }
  };

  return _methods;
};