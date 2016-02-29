'use strict'

var store = require('../lib/store');
var Conf = require('../config/crower.js');
store(function(waterline){
Conf.forEach(function(option){
		  require('../lib/crower')({url: option.zhanUrl,
					 store: waterline,
						parser:require(option.zhanParser)});
						});
});
