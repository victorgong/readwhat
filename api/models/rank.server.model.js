'use strict';

/**
 * Module dependencies.
 */
var Uuid = require('node-uuid');

/**
 * Article Schema
 */
var Rank = {
  identity: 'rank',
  connection: 'simple',
  autoPK: false,
  autoCreatedAt: true,
  attributes: {
    id: {
      type: 'text',
      primaryKey: true,
      unique: true,
      required: true,
      defaultsTo: function () {
        return Uuid.v4();
      }
    },
    rankVal: {
      type: 'float',
      defaultsTo: 0,
      required: true
    },
	 year:{
	  type: 'integer',
	  defaultsTo: 2016
	 },
	 week:{
	  type: 'integer',
	  defaultsTo: 1
	},
	 from:{
	  type:'string',
      defaultsTo: ''
	},
	 fromUniqueId:{
	  type: 'string',
	  defaultsTo: ''
  },
   book:{
    model:'book'
   }
   
  }
};

module.exports = Rank;
