'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var ProjectSchema = new Schema({
  item_id: {
		type: Number,
		required: true,
		unique: true
	},
	created_on: {
		type: Date
	},
	fields: {
		type: Schema.Types.Mixed
  },
  stage: {
		type: String
  },
  priority_id: {
		type: Number
  },
  priority_name: {
		type: String
  },
  stage_id: {
		type: Number
  },
  stage_name: {
		type: String
  },
  project: {
		type: Schema.Types.Mixed,
		required: true
  }
});

/**
 * Validations
 */
// ProjectSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');

mongoose.model('Project', ProjectSchema);
