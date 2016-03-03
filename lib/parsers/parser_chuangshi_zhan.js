'use strict';
var moment = require('moment');
var FROM_SOURCE = 'chuangshi';

module.exports = function(context,cb){
		 var page = context.page,store = context.store;

		 page.evaluate(function() {
			var result = [];

			var ele_list = $('#rankList tr:gt(0)');

			$.each(ele_list,function(index,tr) {
				var tags = [];
				tags.push($(tr).find('td:nth-child(2)').text());
				var name = $(tr).find('td:nth-child(3)>a').first().text();
				var targetHref = $(tr).find('td:nth-child(3)>a').first().attr('href');
				var author = $(tr).find('td:nth-child(4)>a').first().text();
				var lastUpdate = $(tr).find('td:nth-child(6)>span').text();
				result.push( {
					name: name,
					tags : tags,
					targetHref: targetHref,
					author: author,
					lastUpdate:lastUpdate
				});
			});
			return result;
		  })
		  .then(function(data){
				data.forEach(function(item){
					item.from = FROM_SOURCE;
					var regex = /\/([0-9]*)\.html$/;
					var result = item.targetHref.match(regex);
					item.fromUniqueId = result[1];
					store.collections.book.findOne({from:FROM_SOURCE,fromUniqueId:item.fromUniqueId},function(err,book){
						if (undefined !==book){
							item.isDirty = true;
							store.collections.book.update({id:book.id},item,function(err,book){
								if (err){
									console.log(err);
								}
							});
						} else {
							store.collections.book.create(item,function(err,model){
							});
						}
					});

				});
				cb();


			  });
};
