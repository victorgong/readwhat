'use strict';
var moment = require('moment');
var FROM_SOURCE = 'qidian';

module.exports = function(context,cb){
		var page = context.page,store = context.store,book = context.data;
		 page.evaluate(function() {
			var result = [];

			var ele_list = $('#tabThreadList tr[style=""]');

			$.each(ele_list,function(index,tr) {
				var title = $(tr).find('td:nth-child(2) a:first').html();
				var desc = $(tr).find('td:nth-child(2)>p:last').html();

				var url = $(tr).find('td:nth-child(2) a:first').attr('href');
				var who = $(tr).find('td:nth-child(3) a:first').html();
				var when = $(tr).find('td:nth-child(3)>p.p2>span').html();

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
					item.book = book;
					item.from = FROM_SOURCE;
					var regex = /threadid\=([0-9]*)$/;
					var result = item.url.match(regex);
					item.fromUniqueId = result[1];
					store.collections.comment.findOne({from:FROM_SOURCE,fromUniqueId:item.fromUniqueId},function(err,comment){
						if (undefined ===comment) {
							store.collections.comment.create(item,function(err,model){
							});
						}
					});

				});
				cb();


			  });
};
