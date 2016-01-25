'use strict';
angular.module('subsApp')
.controller('configCtrl',['$scope','$state','Config', function($scope,$state, Config){

	var appConfig = Config.read();

	$scope.languages = [
    {name:'English', value:'eng'},
    {name:'French', value:'fre'},
    {name:'Spanish', value:'spa'},
    {name:'Italian', value:'ita'},
    {name:'German', value:'ger'},
    {name:'Portuguese', value:'por'}
  ];

  $scope.subExtensions = [
    {name:'.srt', value:'srt'},
    {name:'.vtt', value:'vtt'}
  ];

  $scope.language = appConfig.language;
  $scope.subExtension = appConfig.subExtension;

  $scope.save = function(){
  	Config.save($scope.language,$scope.subExtension);
  	$state.go('home');
  };

}]);