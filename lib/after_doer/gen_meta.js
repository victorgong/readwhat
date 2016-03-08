'use strict';

var moment = require('moment'),
    _ =require('lodash');
var doJob = function(options){
	var store = options.store;
	var year = moment().year();
	var week = moment().week();
	store.collections.meta.findOne({year:year,week:week})
		.then(function(err,meta){
			if (undefined !== meta) {
				return;
			}
			store.collections.rank.find({year:year, week:week}).sort('rankVal desc').limit(10).populate('book')
		      .exec(function(err,data){
		      	 var meta = _.reduce(data,function(result,book){
		      	 	return {
		      	 		keywords:result.keywords+','+book.book.name,
		      	 		description:result.description+',作者：'+book.book.author+'小说：'+book.book.name
		      	 		};
		      	 },{keywords:'',description:''});
		      	 store.collections.meta.create({
		      	 	year:year,
		      	 	week:week,
		      	 	keywords:meta.keywords,
		      	 	description: meta.description
		      	 	},function(err,model){});
		       });
		});
	
};
module.exports = function(options){
	doJob(options);
};
