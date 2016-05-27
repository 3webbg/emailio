/*jslint node: true */
"use strict";

var Hapi = require('hapi');
var config = require("./config.json");

var server = new Hapi.Server();

server.connection({
  host: config.host,
  port: config.port
});

var path = require('path');

/** Root directory of server */
config.root = path.dirname(require.main.filename);

server.register([
  {
    'register': require('bell')
  },
  {
    'register': require('./plugins/oauth2.js'),
    'options': {
      config: config
    }
  },
  {
    'register': require('./filter/commonLabels.js'),
    'options': {
      config: config
    }
  }
],
function (error) {
  if (!error) {
    server.start(function () {});
  }
});

