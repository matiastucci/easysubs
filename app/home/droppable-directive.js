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
			controller: ['$scope', function($scope){

				$scope.getStatusIcon = function(status){
					var icon = 'icon-download';
					if(status === 'complete'){
						icon = 'icon-check';
					}
					else if(status === 'error'){
						icon = 'icon-cancel';
					}
					return icon;
				};

			}],
			templateUrl: 'home/droppable-template.html' 
		};
	}]);
	
})();