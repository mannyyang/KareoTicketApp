'use strict';

var express = require('express');

/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

var app = express();

var server = require('http').createServer(app);

// Socket.io
var io = require('socket.io').listen(server);

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app, io);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;