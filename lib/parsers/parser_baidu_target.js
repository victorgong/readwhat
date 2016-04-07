'use strict';
var moment = require('moment');

module.exports = function(context,cb){
		 var page = context.page,store = context.store,book = context.data;

		 page.evaluate(function() {
			var result ='';
			var ele= $("div[srcid='wise_novel_book']>div.c-container>a");
			if (ele){
				result = ele.attr('href');
				console.log(result);
			}
			return result;
		  })
		  .then(function(data){
		  		console.log(data);
		  		book.readHref = data;
		  		book.save();
				cb();
			  });
};
