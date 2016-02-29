'use strict';

var phantom = require('phantom');

var doCrawer = function(options){

	phantom.create().then(function(ph) {
	  ph.createPage().then(function(page) {
	    page.property('onConsoleMessage',function(msg, lineNum, sourceId) {
		  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
		});
		console.log(options.url);
		page.open(options.url).then(function(status) {
		  if (status == 'success') {
				var parserExec = function(){
						var context = {page: page,store: options.store,data:options.data};
						options.parser(context,function(){
							console.log('finish'+options.url);
							ph.exit();
							if (options.cb){
								console.log('call cb');
								options.cb();
							}
						});
				};
			  page.includeJs("http://libs.baidu.com/jquery/1.9.1/jquery.min.js")
			      .then(parserExec);
		    }
		})
	  });
	});
};
module.exports = function(options){
	doCrawer(options);
};
