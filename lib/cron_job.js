'use strict'

var CronJob = require('cron').CronJob;
var store = require('../lib/store');
var CrowerConf = require('../config/crower.js');
var CrowerHelper = require('../lib/crower_helper');
var Conf = require('../config/config');
var moment = require('moment')();
var _ = require('lodash');
var qs = require('querystring');
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
			    waterline.collections.book.find({isDirty:true,from:option.from}).exec(function(err,books){
			  			new CrowerHelper(Conf.cron.concurrent || 2,function(book){
			  				return 	{url:book.targetHref,
			  								parser:require(option.detailParser),
			  								store: waterline,
			  								data: book};
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
		new CronJob('0 0 4 * * *', function() {
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

		}, null, true, null);
	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}

	//after doer finally sunday 5am
	try {
		new CronJob('0 0 5 * * 6', function() {
			  waterline.collections.rank.find({year:moment.year(),week:moment.week()}).sort('rankVal desc').limit(10).populate('book').exec(function(err,books){
			  		new CrowerHelper(Conf.cron.concurrent || 1,function(rank){
			        	var book = rank.book;
			  			var url = 'http://m.baidu.com/s?word='+qs.escape(_.trim(book.name));
			  			return 	{url: url,
			  							parser:require('../lib/parsers/parser_baidu_target'),
			  							store: waterline,
			  							data: book
			  							};
			  		}).run(books);

			  	});
			  Conf.getGlobbedFiles('../lib/after_doer/*.js')
			  	   .forEach(function(doer){
			  	   	 require(doer)({store:waterline});
			  	   });


		}, null, true, null);
	} catch(ex){
		 console.log("error....");
		 console.log(ex);
	}
});
