'use strict';

/* Filters */

var app = angular.module('rwFilters', []);

app.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

app.filter('unsafe',['$sce', function($sce) {
  return function(input){
    return $sce.trustAsHtml(input);
  };
}]);

var rankMap = {1:'第一名',2:'第二名',3:'第三名',4:'第四名',5:'第五名',
				6:'第六名',7:'第七名',8:'第八名',9:'第九名',10:'第十名'};
app.filter('rankname',[ function() {
  return function(input){

    return rankMap[input];
	}
}]);
app.filter('ranknum',[ function() {
  return function(input){
    return Math.floor(input * 10000);
	}
}]);
app.filter('topweeks',[ function() {
  return function(input){
    if (undefined === input){
      input = 1;
    }
    input = input ===0?1:input;
    return input.toString()+'周上榜';
  }
}]);
