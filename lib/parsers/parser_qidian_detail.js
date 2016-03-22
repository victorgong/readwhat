'use strict';
var moment = require('moment');
var FROM_SOURCE = 'qidian';

module.exports = function(context,cb){
		var page = context.page,store = context.store,book = context.data;
		 page.evaluate(function() {
			var desc = $('#contentdiv span[itemprop="description"]').html();
			var clickNum = $('#contentdiv table td:nth-child(2)').text();
			var zhanNum = $("#bzhjshu").text();
			return {
				clickNum:clickNum,
				zhanNum:zhanNum,
				desc:desc
			};
		})
		  .then(function(data){
		  		var year = moment().year();
				var week = moment().week();
				store.collections.rank.findOne({year:year,week:week,from:FROM_SOURCE,fromUniqueId:book.fromUniqueId},function(err,old){
					var regex = /([0-9]+)/;
					var result = data.clickNum.match(regex);
					var clickNum = result[1];
					data.zhanNum = data.zhanNum==''?1:data.zhanNum;
					var computeRank = function(){
							var ratio = 1;
							var uv = 15000000;
							var rank = (clickNum/uv * 40 + parseFloat(data.zhanNum)/10000 *60)*ratio;
							return rank;
						};
					var newRank = computeRank();

					if (undefined !==old){
						
						old.rankVal = newRank;
						old.save();
					} else {
						var item = {year:year,week:week,rankVal:newRank,from:book.from,fromUniqueId:book.fromUniqueId,book:book.id};
						store.collections.rank.create(item,function(err,model){});
					}
					book.descrip = data.desc;
					book.isDirty = false;
					book.save();
				});
				cb();


			  });
};
