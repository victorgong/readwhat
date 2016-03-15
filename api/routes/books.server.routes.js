'use strict';
/**
 * Module dependencies.
 */
var Books      = require('../../api/controllers/books.server.controller');
var Moment = require('moment');

module.exports = function (server){

  server.route(
  [{
      path: '/',
      method: 'GET',
      handler: Books.index
   },
    {
      path: '/api/books/thisweek',
      method: 'GET',
      handler: Books.thisWeek
   },
   {
      path: '/api/books/lastweek',
      method: 'GET',
      handler: Books.lastWeek
   },
   {
      path: '/api/books/{year}/{week}',
      method: 'GET',
      handler: Books.thWeek
   }]
  );

};
