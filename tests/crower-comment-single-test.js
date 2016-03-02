'use strict'

var store = require('../lib/store');
var CrowerHelper = require('../lib/crower_helper');
var CrowerConf = require('../config/crower.js');
var Conf = require('../config/config');
var moment = require('moment')();
process.on('uncaughtException',function(err){
   console.log(err);
});

var args = process.argv.slice(2);
store(function(waterline){
    CrowerConf.forEach(function(option){
      waterline.collections.book.find({from:option.from,fromUniqueId:args}).exec(function(err,books){
    		new CrowerHelper(Conf.cron.concurrent || 5,function(book){
    			var bookUniqueId = book.fromUniqueId;
    			var url = book.targetHref;
    			if (option.commentUrl) {
    				url = option.commentUrl.replace('{book}',bookUniqueId);
    			}
    			return 	{url: url,
    							parser:require(option.commentParser),
    							store: waterline,
    							data: bookUniqueId
    							};
    		}).run(books);
      });
    });
});
