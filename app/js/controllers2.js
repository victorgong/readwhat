'use strict';

/* Controllers */

var rwControllers = angular.module('rwControllers', []);

rwControllers.controller('HeaderCtrl', ['$scope','$location','$rootScope',
  function($scope,$location,$rootScope) {
    $scope.menus = [{uri:"/books/thisweek",name:"本周"}
                //  ,{uri:"/books/lastweek",name:"上周"}
                //  ,{uir:"/books/history",name:"历史"}
                ];
    $scope.isActive=function(path){
        return path === $location.path();
    };
    $rootScope.$on("$viewContentLoaded",function(){
      $("#navbar1").collapse('hide');
    })
  }]);
rwControllers.controller('ThisWeekCtrl', ['$scope', 'Book',
  function($scope, Book) {
    $scope.books = Book.thisWeek();
  }]);
 rwControllers.controller('LastWeekCtrl', ['$scope', 'Book',
  function($scope, Book) {
    $scope.books = Book.lastWeek();
  }]);

rwControllers.controller('HistoryCtrl', ['$scope', '$routeParams', 'Book',
  function($scope, $routeParams, Book) {
    $scope.books = Book.thWeek();

  }]);
