'use strict'
var store = require('../lib/store');
var CrowerConf = require('../config/crower.js');
var moment = require('moment'),
	_ = require('lodash');
process.on('uncaughtException',function(err){
   console.log(err);
});
store(function(waterline){

	  waterline.collections.rank.find({year:moment().year(), week:moment().week()}).sort('rankVal desc').limit(10).populate('book')
      .populate('book.comments',{limit:10,sort:'createdAt desc'})
      .exec(function(err,data){
      	 data.forEach(function(item){
      	 	console.log(item.book.comments)
      	 });
       });
});
