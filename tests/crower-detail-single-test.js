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
    		 new CrowerHelper(Conf.cron.concurrent || 1,function(book){
                    var bookUniqueId = book.fromUniqueId;

                    return  {url:book.targetHref,
                                    parser:require(option.detailParser),
                                    store: waterline,
                                    data: book};
                }).run(books);
      });
    });

});
