'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + '/../../..');

/**
 * Podio App ID & Token
 */
var podioClientID = 'ticketing-system';
var podioClientSecret = 'PSfThExs43P7IsrDzSHvQIGtoYkLdPM6GkRfyfNSNOD2dnLFS8f1jnWqfdfNHzMf';
var podioAppID = '5483249';
var podioAppToken = '8d0f63fa84f7462d875f405d7f5dbb29';

module.exports = {
  root: rootPath,
  port: process.env.PORT || 3000,
	mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },
  podioClientID: podioClientID,
  podioClientSecret: podioClientSecret,
  podioAppID: podioAppID,
  podioAppToken: podioAppToken
};