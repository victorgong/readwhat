'use strict'

var CronJob = require('cron').CronJob;
var store = require('../lib/store');
var CrowerConf = require('../config/crower.js');
var CrowerHelper = require('../lib/crower_helper');
var Conf = require('./config/config');
var moment = require('moment')();
store(function(waterline){
	//fetch top click books daily at 0 am;
	try {
		new CronJob('0 5 0 *  * *', function() {

				try {
					console.log('begin...');
					CrowerConf.forEach(function(option){
							  require('../lib/crower')({url: option.clickUrl,
										  store: waterline,
											parser:require(option.clickParser)});
											});


				} catch (e) {
					console.log('error');
					console.log(e);
				}
		}, null, true, null);
	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}

	//fetch top favor books daily at 0 am;
	try {
		new CronJob('0 10 0 * *  *', function() {
			CrowerConf.forEach(function(option){
					  require('../lib/crower')({url: option.zhanUrl,
								 store: waterline,
									parser:require(option.zhanParser)});
									});

		}, null, true, null);
	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}
	//fetch all updated detail book desc at 1:00
	try {
		new CronJob('0 20 0 * * *', function() {
			  CrowerConf.forEach(function(option){
			    waterline.collections.book.find({isDirty:true,from:option.from,year:moment.year(),week:moment.week()}).exec(function(err,books){
			  			new CrowerHelper(Conf.cron.concurrent || 2,function(book){
			  				var bookUniqueId = book.fromUniqueId;

			  				return 	{url:book.targetHref,
			  								parser:require(option.detailParser),
			  								store: waterline,
			  								data: book.id};
			  			}).run(books);
			  	});
			});


		}, null, true, null);
	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}
	//fetch qidian comment daily at 1 am:
	try {
		new CronJob('0 0 4 * *  *', function() {
			  CrowerConf.forEach(function(option){
			    waterline.collections.book.find({from:option.from,year:moment.year(),week:moment.week()}).limit(10).sort('rank desc').exec(function(err,books){
			  		new CrowerHelper(Conf.cron.concurrent || 2,function(book){
			  			var bookUniqueId = book.fromUniqueId;
			  			var url = book.targetHref;
			  			if (option.commentUrl) {
			  				url = option.commentUrl.replace('{book}',bookUniqueId);
			  			}
			  			return 	{url: url,
			  							parser:require(option.commentParser),
			  							store: waterline,
			  							data: book.id
			  							};
			  		}).run(books);

			  	});
			});

		}, null, true, null);
	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}
});
