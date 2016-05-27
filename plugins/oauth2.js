/*jslint node: true */
"use strict";

exports.register = function (server, options, next) {

  var config = options.config;

  server.auth.strategy('gmail', 'bell', {
    provider: {
      protocol: 'oauth2',
      useParamsAuth: false,
      auth: 'https://accounts.google.com/o/oauth2/v2/auth',
      token: 'https://www.googleapis.com/oauth2/v4/token'
    },
    isSecure: false,
    scope: ["https://mail.google.com/"],
    clientId: config.app_id,
    clientSecret: config.app_secret,
    password: "Z1o2P8Tk0nrHwCxZuiSZPIh3p6Ll17nG8zKKK7kcx5YExmtMhxPl6u09k5kR36N",
    location: "http://localhost:" + config.port
  });

  next();
};

exports.register.attributes = {
  name: 'oauth2',
  version: '1.0.0'
};