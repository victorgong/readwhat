'use strict';

/**
 * Module dependencies.
 */
var Uuid = require('node-uuid');

/**
 * Article Schema
 */
var Meta = {
  identity: 'meta',
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
    year:{
      type:'integer',
      required:true
    },
    week:{
      type:'integer',
      required: true

    },
    keywords:{
      type: 'string',
      defaultsTo: ''
    },
    description:{
      type:'string',
      defaultsTo: ''
    }
  }
};

module.exports = Meta;
