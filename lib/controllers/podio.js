'use strict';

var Podio = require('podio-api'),
  options = {};

function podio(config, io){

  // Podio authentication 
  var podioAPI = new Podio({ client_id: config.podioClientID, client_secret: config.podioClientSecret });

  podioAPI.authenticate({ app_id: config.podioAppID, app_token: config.podioAppToken }, function(err, result) {
    if (err) return console.error (err);
    
    options = {
      auth: result.auth,
      app_id: config.podioAppID
    };
  });

  // function to grab all items in Project Web App.
  podio.projects = function(req, res){

    options.body = {
      limit: 10
    };

    podioAPI.itemsFilterItems(options, function (err, result) {
      if (err) return console.error(err);
      console.log(result);
      res.json(result.body.items);
      io.sockets.emit('ready');
    });

  //io.emit('an event sent to all connected clients 2');
    
  };

  return podio;
}

module.exports = podio;