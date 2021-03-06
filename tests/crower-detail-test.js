﻿'use strict'

var store = require('../lib/store');
var CrowerHelper = require('../lib/crower_helper');
var CrowerConf = require('../config/crower');
var Conf = require('../config/config.js');
var moment = require('moment')();
store(function(waterline){
  CrowerConf.forEach(function(option){
    waterline.collections.book.find({isDirty:true,from:option.from}).exec(function(err,books){
  			new CrowerHelper(Conf.cron.concurrent || 2,function(book){
  				var bookUniqueId = book.fromUniqueId;

  				return 	{url:book.targetHref,
  								parser:require(option.detailParser),
  								store: waterline,
  								data: book};
  			}).run(books);
  	});
  });
});
