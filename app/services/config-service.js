'use strict';
angular.module('subsApp')
.factory('Config',['$window', function($window){

	var language = JSON.parse($window.localStorage.getItem("language")) || {name:'English', value:'eng'};
	var subExtension = JSON.parse($window.localStorage.getItem("subExtension")) || {name:'.srt', value:'srt'};

	return {
		read: function(){
			return {
				language: language,
				subExtension: subExtension
			};
		},
		save: function(lang, ext){
			language = lang;
			subExtension = ext;
			$window.localStorage.setItem("language", JSON.stringify(language));
			$window.localStorage.setItem("subExtension", JSON.stringify(subExtension));
		}
	};

}]);