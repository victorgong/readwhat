'use strict'
var store = require('../lib/store');
var worker = require('../lib/after_doer/set_top_count.js');

store(function(waterline){
	worker({store:waterline});
});