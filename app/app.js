'use strict';
angular.module('subsApp', ['ui.router'])
.run(['$document', function($document){

  $document[0].addEventListener('drop',function(event){
    event.preventDefault();
    return false;
  }, false);
  $document[0].addEventListener('dragover',function(event){
    event.preventDefault();
    return false;
  }, false);

}])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
  
}]);
