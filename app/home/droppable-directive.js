(function(){

	'use strict';
	angular.module('subsApp')
	.directive('droppable', [function(){
		return {
			restrict: 'AE',
			scope: {
				videos: '=',
				onDrop: '&'
			},
			link: function(scope, elem, attrs){
				elem[0].addEventListener('drop', function(event){
					scope.onDrop({
						videos: event.dataTransfer.files
					});
				});
			},
			templateUrl: 'home/droppable-template.html' 
		};
	}]);
	
})();