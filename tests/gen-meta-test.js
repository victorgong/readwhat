'use strict'
var store = require('../lib/store');
var worker = require('../lib/after_doer/gen_meta.js');

store(function(waterline){
	worker({store:waterline});
});
