'use strict';
var moment = require('moment');
var FROM_SOURCE = 'qidian';

module.exports = function(context,cb){
		var page = context.page,store = context.store,book = context.data;
		 page.evaluate(function() {
			var desc = $('#contentdiv span[itemprop="description"]').html();
			var clickNum = $('#contentdiv table td:nth-child(2)').text();
			var zhanNum = $("#zan_box_haop_id :last-child").text();
			return {
				clickNum:clickNum,
				zhanNum:zhanNum,
				desc:desc
			};
		})
		  .then(function(data){
				store.collections.book.findOne({id:book},function(err,old){
					if (undefined !==old){
						old.descrip = data.desc;
						var regex = /([0-9]+)/;
						var result = data.clickNum.match(regex);
						var clickNum = result[1];
						var computeRank = function(){
							var ratio = 1;
							var uv = 15000000;
							var rank = (clickNum/uv * 40 + parseFloat(data.zhanNum)/100 *60)*ratio;
							return rank;
						};
						old.rank = computeRank();
						old.isDirty = false;
						old.save();
					}
				});

				cb();


			  });
};
