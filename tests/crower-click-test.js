'use strict'
var store = require('../lib/store');
var Conf = require('../config/crower.js');
process.on('uncaughtException',function(err){
   console.log(err);
});
store(function(waterline){
		Conf.forEach(function(option){
				  require('../lib/crower')({url: option.clickUrl,
							  store: waterline,
								parser:require(option.clickParser)});
								});
});
