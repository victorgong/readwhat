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
   },
   comments:{
    collection:'comment',
    via: 'book'
   },
   topWeeks:{
    type: 'integer',
    defaultsTo: 0
   }
  }
};

module.exports = Book;
