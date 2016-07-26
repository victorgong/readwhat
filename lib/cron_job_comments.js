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

	//fetch qidian comment daily at 1 am:
	try {
			  CrowerConf.forEach(function(option){
			    waterline.collections.rank.find({from:option.from,year:moment.year(),week:moment.week()}).sort('rankVal desc').limit(10).populate('book').exec(function(err,books){
			  		new CrowerHelper(Conf.cron.concurrent || 2,function(rank){
			  			var book = rank.book;
			  			var bookUniqueId = book.fromUniqueId;
			  			var url = book.targetHref;
			  			if (option.commentUrl) {
			  				url = option.commentUrl.replace('{book}',bookUniqueId);
			  			}
			  			return 	{url: url,
			  							parser:require(option.commentParser),
			  							store: waterline,
			  							data: book
			  							};
			  		}).run(books);

			  	});
			});

	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}

});
