/*jslint node: true */
"use strict";

exports.register = function (server, options, next) {

  require('./commonLabels/routes.js')(server, options);

  next();
};

exports.register.attributes = {
  name: 'commonLabels',
  version: '1.0.0'
};