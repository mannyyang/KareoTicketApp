'use strict';

/**
 * Application routes
 */
module.exports = function(app, io) {

	var api = require('./controllers/api')(io);
  var index = require('./controllers');

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.get('/api/get', api.get);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/', index.index);
};

