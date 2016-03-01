'use strict';
var moment = require('moment');
var FROM_SOURCE = 'chuangshi';

module.exports = function(context,cb){
		var page = context.page,store = context.store,book = context.data;
		 page.evaluate(function() {
			var result = [];

			var ele_list = $('#newCommentList>li');

			$.each(ele_list,function(index,tr) {
				var title = $(tr).find('p.title>a:last').text();
				var desc = $(tr).find('p.nev>a:last').text();

				var url = $(tr).find('p.title>a:last').attr('href');
				var who = $(tr).find('b.name>a').text();
				var when = $(tr).find('b.time').text();

				result.push( {
					title: title,
					desc: desc,
					url : url,
					who: who,
					when: when
				});
			});
			return result;
		  })
		  .then(function(data){
				data.forEach(function(item){
					item.bookUniqueId = book;
					item.from = FROM_SOURCE;
					if ( undefined !==item.url) {
						var regex = /([0-9a-zA-Z\-]*).html$/;

						var result = item.url.match(regex);
						if (result.length>1) {
							item.fromUniqueId = result[1];
						}
					}

					store.collections.comment.findOne({from:FROM_SOURCE,fromUniqueId:item.fromUniqueId},function(err,comment){

						if (undefined ===comment) {
							store.collections.comment.create(item,function(err,model){
								if (err) {
									console.log(err);
								}
							});
						}

					});
				});
				if (cb) {
					cb();
				} else {
					console.log('no cb');
				}
		});
};
