'use strict';

/* App Module */

var rwApp = angular.module('rwApp', [
  'ngRoute',
  'rwControllers',
  'rwServices',
  'rwFilters',
  'wu.masonry'
]);

rwApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/books/thisweek', {
        templateUrl: 'partials/book-thisweek.html',
        controller: 'ThisWeekCtrl'
      }).
      when('/books/lastweek', {
        templateUrl: 'partials/book-thisweek.html',
        controller: 'LastWeekCtrl'
      }).
      when('/books/history', {
        templateUrl: 'partials/book-thisweek.html',
        controller: 'HistoryCtrl'
      }).
      otherwise({
        redirectTo: '/books/thisweek'
      });
  }]);
