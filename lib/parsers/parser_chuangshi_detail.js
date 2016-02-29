'use strict';
var moment = require('moment');
var FROM_SOURCE = 'chuangshi';

module.exports = function(context,cb){
		var page = context.page,store = context.store,book = context.data;
		 page.evaluate(function() {
			var parentNode = $('div.main2>div.left');
			var desc = $(parentNode).find('div.info:first').text();
			var clickNum = parentNode.find('div.num td:nth-child(3)').text();
			var zhanNum = $('#swishnev004>div.sw_left b.bts>span').text();
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
							var ratio = 4;
							var uv = 10000000;
							var rank = (clickNum/uv * 40 + data.zhanNum/uv *60)*ratio;
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
