'use strict';
angular.module('subsApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
  .state('home', {
  	url: "/home",
  	templateUrl: "partials/home.html",
  	controller: "homeCtrl"
  })
  .state('config', {
  	url: "/config",
  	templateUrl: "partials/config.html",
  	controller: "configCtrl"
  })
  .state('info', {
  	url: "/info",
  	templateUrl: "partials/info.html",
  	controller: "infoCtrl"
  });
  
});
