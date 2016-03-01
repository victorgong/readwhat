'use strict'

var store = require('../lib/store');
var CrowerConf = require('../config/crower.js');
store(function(waterline){
CrowerConf.forEach(function(option){
		  require('../lib/crower')({url: option.zhanUrl,
					 store: waterline,
						parser:require(option.zhanParser)});
						});
});
