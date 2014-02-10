'use strict';

/**
 * Application routes
 */
module.exports = function(app, io, config) {

	var index = require('./controllers');
	var api = require('./controllers/api')();
	var podio = require('./controllers/podio')(config, io);

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);

  // Server Podio Routes
  app.get('/podio/projects', podio.projects);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);

};

