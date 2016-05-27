/*jslint node: true */
"use strict";

module.exports =  function (server, options) {

  var messages = require('./filter.js')(options);

  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: 'gmail'
    },
    handler: messages.list
  });
};
