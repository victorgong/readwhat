'use strict';

/* Services */

var rwServices = angular.module('rwServices', ['ngResource']);

rwServices.factory('Book', ['$resource','Util',
  function($resource,Util){
	var baseUri = "api/books/";
	var getThisWeek = function(){
		return $resource(baseUri+'thisweek?t='+Util.ranFunc().toString(), {}, {
			  query: {method:'GET', isArray:true}
			}).query();
	};
	var getLastWeek = function(){
		return $resource(baseUri+'lastweek?t='+Util.ranFunc().toString(), {}, {
			  query: {method:'GET', isArray:true}
			}).query();
	};
	var getThWeek = function(year,week){
		var uri2 = "{year}/{week}".replace('{year}',year)
				    .replace('{week}',week);
		return $resource(baseUri+uri2+'?t='+Util.ranFunc().toString(), {}, {
			  query: {method:'GET', isArray:true}
			}).query();
	};
	return {
			thisWeek: getThisWeek,
			lastWeek: getLastWeek,
			thWeek: getThWeek
	       };
  }]);

rwServices.factory('Util',function(){
	var ranDom = function(){
		return Math.floor(Math.random() * 100000) + 1;
	}
	return {ranFunc: ranDom};
});
