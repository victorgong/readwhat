'use strict';
var moment = require('moment');
var FROM_SOURCE = 'qidian';

module.exports = function(context,cb){
		 var page = context.page,store = context.store;

		 page.evaluate(function() {
			var result = [];

			var ele_list = $('#textlist tr:gt(0)');

			$.each(ele_list,function(index,tr) {
				var tags = [];
				tags.push($(tr).find('td:nth-child(2)>a').text());
				var name = $(tr).find('td:nth-child(3)>a').first().text();
				var comments =[];
				var targetHref = $(tr).find('td:nth-child(3)>a').first().attr('href');
				var author = $(tr).find('td:nth-child(5)>a').first().text();
				var lastUpdate = $(tr).find('td:nth-child(6)').text();
				result.push( {
					name: name,
					tags : tags,
					comments: comments,
					targetHref: targetHref,
					author: author,
					lastUpdate:lastUpdate
				});
			});
			return result;
		  })
		  .then(function(data){
				var yearOfCurrent = moment().year();
				var weekOfCurrent = moment().week();
				data.forEach(function(item){
					item.year = yearOfCurrent;
					item.week = weekOfCurrent;
					item.from = FROM_SOURCE;
					var regex = /\/([0-9]*)\.aspx$/;
					var result = item.targetHref.match(regex);
					item.fromUniqueId = result[1];
					store.collections.book.findOne({from:FROM_SOURCE,year: yearOfCurrent,week:weekOfCurrent,fromUniqueId:item.fromUniqueId},function(err,book){
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
