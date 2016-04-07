'use strict';

/**
 * Module dependencies.
 */
var Boom           = require('boom'),
    Moment = require('moment'),
    Promise = require('bluebird'),
    _ = require('lodash');

exports.thisWeek = function (request, reply) {

  var Rank = request.collections.rank;
  var Book = request.collections.book;
  var moment = Moment();//Moment().subtract(7, 'days');
  var year = moment.year();
  var week = moment.week();
  Rank.find({year:year, week:week}).sort('rankVal desc').limit(10).populate('book')
      .populate('book.comments',{limit:10,sort:'createdAt desc'})
      .exec(function(err,data){
         reply(data.reverse());
       });

 };
 exports.index = function(request,reply){
  var meta = request.collections.meta;
  var moment = Moment().subtract(7, 'days');
  meta.findOne({year: moment.year(),week:moment.week()})
      .then(function(data){
         data = data || {keywords:'',description:''};
         reply.view('index',{
          keywords:data.keywords,
          description: data.description
        });
      });

 };

exports.lastWeek = function (request, reply) {

  var Rank = request.collections.rank;
  var Book = request.collections.book;
  var moment = Moment().subtract(14, 'days');
  var year = moment.year();
  var week = moment.week();
  Rank.find({year:year, week:week}).sort('rankVal desc').limit(10).populate('book')
      .populate('book.comments',{limit:10,sort:'createdAt desc'})
      .exec(function(err,data){
         reply(data.reverse());
       });
 };
exports.thWeek = function (request, reply) {
  var Book = request.collections.book;
  var moment = Moment();

  var year = request.params.year || moment.year();
  var week = request.params.week || moment.week();
  var books = Book.find({year:year, week:week}).limit(10).sort('rank desc').exec(function(err,data){
	  reply(data.reverse());
  });
 };
