'use strict'
var store = require('../lib/store');
var CrowerConf = require('../config/crower.js');
process.on('uncaughtException',function(err){
   console.log(err);
});
store(function(waterline){
		CrowerConf.forEach(function(option){
				  require('../lib/crower')({url: option.clickUrl,
							  store: waterline,
								parser:require(option.clickParser)});
								});
});
