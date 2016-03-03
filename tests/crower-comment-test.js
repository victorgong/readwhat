'use strict'

var store = require('../lib/store');
var CrowerHelper = require('../lib/crower_helper');
var CrowerConf = require('../config/crower.js');
var Conf = require('../config/config');
var moment = require('moment')();
process.on('uncaughtException',function(err){
   console.log(err);
});
store(function(waterline){
  CrowerConf.forEach(function(option){
    waterline.collections.rank.find({from:option.from}).sort('rankVal desc').limit(10).populate('book').exec(function(err,books){
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
});
