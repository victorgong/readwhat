var webPage = require('webpage');
var page = webPage.create();
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};
page.open('http://top.qidian.com/Book/TopDetail.aspx?TopType=4', function(status) {

  if (status == 'success') {
			
			  page.includeJs("http://localhost:3000/bower_components/jquery/dist/jquery.min.js",
					function(){
			
					console.log('enter');
					  
				 });
		    }
	phantom.exit();

});