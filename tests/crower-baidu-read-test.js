'use strict'

var store = require('../lib/store');
var CrowerHelper = require('../lib/crower_helper');
var CrowerConf = require('../config/crower.js');
var Conf = require('../config/config');
var moment = require('moment')();
var _ = require('lodash');
var qs = require('querystring');
process.on('uncaughtException',function(err){
   console.log(err);
});
store(function(waterline){
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
});

