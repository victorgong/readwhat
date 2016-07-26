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
	//fetch top click books daily at 0 am;
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
});
