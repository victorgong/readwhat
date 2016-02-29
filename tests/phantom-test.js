var webPage = require('webpage');
var page = webPage.create();
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};
page.open('http://top.qidian.com/Book/TopDetail.aspx?TopType=4', function(status) {

  if (status == 'success') {
			
			  page.includeJs("http://localhost:3000/bower_components/jquery/dist/jquery.min.js",
					function(){
			
					 page.evaluate(function() {
						console.log('enter');
						var result = [];
						
						var ele_list = $('#textlist tr:gt(0)');
						console.log(ele_list.size());
						/*
						$.each(ele_list,function(index,tr) {
							var rank = $(tr).find(':nth-child(0)').html();
							var tags = [];
							$.each($(tr).find(':nth-child(1)>a'),function(indexOfTag,tag_ele){
								tags.push(tag_ele.html());
							});
							var name = $(tr).find(':nth-child(2)>a').first().html();
							var comments =[];
							var targetHref = $(tr).find(':nth-child(2)>a').first().attr('href');
							result.push( {
								rank: rank,
								name: name,
								tags : tags,
								comments: comments,
								tragetHref: targetHref
							});
						});
						*/
						//return result;
					  })
					  
				 });
		    }
	phantom.exit();

});