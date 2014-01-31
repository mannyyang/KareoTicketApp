'use strict';

var path = require('path');
var Podio = require("podio-api");

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

exports.podioitems = function(req, res){
  var podio = new Podio({ client_id: "ticketing-system", client_secret: "PSfThExs43P7IsrDzSHvQIGtoYkLdPM6GkRfyfNSNOD2dnLFS8f1jnWqfdfNHzMf" });

  podio.authenticate({ username:"manuel.yang@kareo.com", password: "azn1pride" }, function(err, result) {
    if (err) return console.error (err);
    console.log (result.auth);

    var options = {
      auth: result.auth,
      app_id: 5483249
    };

    podio.itemsFilterItems(options, function (err, result) {
      if (err) return console.error(err);
      console.log(result);
    });

  });
};

/**
 * Send our single page app
 */
exports.index = function(req, res) {

  res.render('index');
};
