'use strict'
var store = require('../lib/store');

process.on('uncaughtException',function(err){
   console.log(err);
});
store(function(waterline){
		waterline.collections.book.sync(function(){
			console.log('done');
		});
});
