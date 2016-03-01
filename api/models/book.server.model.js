'use strict';

/**
 * Module dependencies.
 */
var Uuid = require('node-uuid');

/**
 * Article Schema
 */
var Book = {
  identity: 'book',
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
    rank: {
      type: 'float',
      defaultsTo: 0,
      required: true
    },
    name: {
      type: 'text',
      defaultsTo: ''
    },
	 descrip: {
      type: 'text',
      defaultsTo: ''
    },
	 tags: {
      type: 'array',
	    defaultsTo: []
    },
	 targetHref: {
      type: 'string',
      defaultsTo: '',
      required: true
    },
	 author: {
		type: 'string',
		defaultsTo: '匿名'
	 },
	 lastUpdate:{
		type: 'string',
		defaultsTo: ''
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
   isDirty:{
     type: 'boolean',
     defaultsTo: true
   }
  }
};

module.exports = Book;
