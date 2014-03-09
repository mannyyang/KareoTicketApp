'use strict';

var mongoose = require('mongoose'),
    Project = mongoose.model('Project');

var Podio = require('podio-api');

function podio(config, io){

  // Podio client authentication 
  var podioAPI = new Podio({ client_id: config.podioClientID, client_secret: config.podioClientSecret });

  // Podio app authentication and database insertion
  podioAPI.authenticate({ app_id: config.podioAppID, app_token: config.podioAppToken }, function(err, result) {
    if (err) return console.error (err);
    
    var options = {
      auth: result.auth,
      app_id: config.podioAppID,
      body: {
        limit: 100
      }
    };

    podioAPI.itemsFilterItems(options, function (err, result) {
      if (err) return console.error(err);
      Project.find({}).remove(function() {
        for (var i = 0; i < result.body.items.length; i++){

          var fieldVals = {};
          var stage = '';

          for (var j = 0; j < result.body.items[i].fields.length; j++){
            fieldVals[result.body.items[i].fields[j].external_id] = result.body.items[i].fields[j].values;
          }

          // console.log(fieldVals.stage[0].value);

          var project = new Project({
            item_id: result.body.items[i].item_id,
            created_on: result.body.items[i].created_on,
            fields: fieldVals,
            stage_id: fieldVals.stage[0].value.id,
            stage_name: fieldVals.stage[0].value.text,
            priority_id: fieldVals.priority[0].value.id,
            priority_name: fieldVals.priority[0].value.text,
            responsible_persons: fieldVals['responsible-person'],
            stakeholders: fieldVals['stakeholders'],
            project: result.body.items[i]
          });
          
          console.log(project);
          project.save();
        }
      });
    });

  });

  // function to grab all items in Project Web App.
  podio.projects = function(req, res){
    Project.find({ 'stage': {$ne: 'Archived'}, 'priority_name': {$ne: 'Archived'} }).execFind(function(err, projects) {
      if (!err) {
        return res.json(projects);
      } else {
        return res.send(err);
      }
    });
  //io.emit('an event sent to all connected clients 2');
  };

  podio.archivedProjects = function(req, res){
    Project.find({ $or:[ {'stage': 'Archived'}, {'priority_name': 'Archived'} ]}).execFind(function(err, projects) {
      if (!err) {
        return res.json(projects);
      } else {
        return res.send(err);
      }
    });
  };

  podio.requestForm = function(req, res){
    io.sockets.emit('ready');
  };

  return podio;
}

module.exports = podio;