'use strict'

var CronJob = require('cron').CronJob;
var store = require('../lib/store');
var CrowerConf = require('../config/crower.js');
var CrowerHelper = require('../lib/crower_helper');
var Conf = require('../config/config');
var moment = require('moment')();
var _ = require('lodash');
var qs = require('querystring');
var Path = require('path');
store(function(waterline){

	//fetch all updated detail book desc at 1:00
	try {
			  CrowerConf.forEach(function(option){
			    waterline.collections.book.find({isDirty:true,from:option.from}).exec(function(err,books){
			  			new CrowerHelper(Conf.cron.concurrent || 2,function(book){
			  				return 	{url:book.targetHref,
			  								parser:require(option.detailParser),
			  								store: waterline,
			  								data: book};
			  			}).run(books);
			  	});
			});
	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}

});
