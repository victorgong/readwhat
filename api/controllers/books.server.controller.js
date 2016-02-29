'use strict';

/**
 * Module dependencies.
 */
var Boom           = require('boom'),
    Moment = require('moment');

exports.thisWeek = function (request, reply) {

  var Book = request.collections.book;
  var moment = Moment();
  var year = moment.year();
  var week = moment.week();
  var books = Book.find({year:year, week:week}).limit(10).sort('rank desc').populate('comments',{limit:10,sort:'createdAt desc'}).exec(function(err,data){
	  reply(data.reverse());
  });
 };
exports.lastWeek = function (request, reply) {
  var Book = request.collections.book;
  var moment = Moment().subtract(7, 'days');

  var year = moment.year();
  var week = moment.week();
  var books = Book.find({year:year, week:week}).limit(10).sort('rank desc').populate('comments',{limit:10,sort:'createdAt desc'}).exec(function(err,data){
	  reply(data.reverse());
  });
 };
exports.thWeek = function (request, reply) {
  var Book = request.collections.book;
  var moment = Moment();

  var year = request.params.year || moment.year();
  var week = request.params.week || moment.week();
  var books = Book.find({year:year, week:week}).limit(10).sort('rank desc').populate('comments',{limit:10,sort:'createdAt desc'}).exec(function(err,data){
	  reply(data.reverse());
  });
 };
