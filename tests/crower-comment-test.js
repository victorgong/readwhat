'use strict'

var store = require('../lib/store');
var CrowerHelper = require('../lib/crower_helper');
var Conf = require('../config/crower.js');
process.on('uncaughtException',function(err){
   console.log(err);
});
store(function(waterline){
  Conf.forEach(function(option){
    waterline.collections.book.find({from:option.from}).limit(10).sort('rank desc').exec(function(err,books){
  		new CrowerHelper(Conf.cron.concurrent || 5,,function(book){
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
});
