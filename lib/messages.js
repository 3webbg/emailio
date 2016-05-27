/*jslint node: true */
"use strict";

module.exports = function (options) {

  var googleapis = require("googleapis");
  var OAuth2 = googleapis.auth.OAuth2;
  var config = options.config;

  var OAuth2Client = new OAuth2(config.app_id, config.app_secret, config.protocol + "://" + config.host + ":" + config.port);

  var _methods = {};
  var token = null;

  _methods.fetch = function(oauthtoken, maxResults, callback) {

    token = ((oauthtoken != null)  ? oauthtoken : token);

    OAuth2Client.setCredentials({
      access_token: token
    });

    googleapis.gmail('v1').users.messages.list({
      auth: OAuth2Client,
      userId: 'me',
      maxResults: maxResults
    }, callback);
  };

  _methods.read = function(oauthtoken, id, callback) {

    token = ((oauthtoken != null)  ? oauthtoken : token);

    OAuth2Client.setCredentials({
      access_token: token
    });

    googleapis.gmail('v1').users.threads.get({
      id: id,
      auth: OAuth2Client,
      userId: 'me',
      format: "metadata"
    }, callback);
  };

  /** Parse methods */
  _methods.parse = {

    header: {

      from: function(message) {

        /** Gets sender from email headers */
        var headers = message.payload.headers;
        for(var header_key in headers) {
          var header = headers[header_key];

          if(header.name == 'From') {
            return header.value;
          }
        }
      },

      label2ValuePair: function(message) {

        /** Gets labels */
        var _labels = [];
        var labels = message.labelIds;
        for(var label_key in labels) {
          var label = labels[label_key];
          _labels.push({
            "name": label,
            "value": 1
          });
        }
        return _labels;
      }
    }
  };

  return _methods;
};