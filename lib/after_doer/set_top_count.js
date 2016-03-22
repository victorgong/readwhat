'use strict';

var moment = require('moment');
var doJob = function(options){
	var store = options.store;
	var year = moment().year();
	var week = moment().week();

	store.collections.rank.find({year:year, week:week}).sort('rankVal desc').limit(10).populate('book')
      .exec(function(err,data){
      	 data.forEach(function(rank){
	         var book = rank.book;
	         if (undefined === book.topWeeks) {
	         	book.topWeeks = 0;
	         }
	         book.topWeeks =book.topWeeks?book.topWeeks+1:1;
	         book.save();
     	 });
     	 console.log('set top count complete!');
       });
	
};
module.exports = function(options){
	doJob(options);
};
