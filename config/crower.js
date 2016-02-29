'use strict';

var Conf = [
    {
		from :'qidian',
		zhanUrl : 'http://top.qidian.com/Book/TopDetail.aspx?TopType=40&Time=4',
		zhanParser : '../lib/parsers/parser_qidian_zhan',
		clickUrl: 'http://top.qidian.com/Book/TopDetail.aspx?TopType=1&Time=1',
		clickParser: '../lib/parsers/parser_qidian_click',
		detailParser: '../lib/parsers/parser_qidian_detail',
		commentUrl: 'http://forum.qidian.com/NewForum/List.aspx?bookId={book}&postType=-1',
		commentParser: '../lib/parsers/parser_qidian_comment'
	},
  {
			from :'chuangshi',
			zhanUrl : 'http://chuangshi.qq.com/bang/tj/all-week.html',
			zhanParser : '../lib/parsers/parser_chuangshi_zhan',
			clickUrl: 'http://chuangshi.qq.com/bang/rq/all-week.html',
			clickParser: '../lib/parsers/parser_chuangshi_click',
			detailParser: '../lib/parsers/parser_chuangshi_detail',
			commentParser: '../lib/parsers/parser_chuangshi_comment'
		}];
module.exports = Conf;
