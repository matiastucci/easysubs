(function(){
	
	'use strict';
	angular.module('subsApp')
	.controller('homeCtrl',['$scope', 'Config', 'OpenSubtitles',
		function($scope, Config, OpenSubtitles){

		var http = require("http");
		var path = require('path');
		var fs 	 = require("fs");

		var appConfig = Config.read();

		$scope.data = {};
		$scope.data.videos = [];
		var downloadsCount = 0;

		var sendCompletedNotification = function(){
			new Notification('Download completed', {
		    title: "Download completed",
		    body: "Enjoy :)",
		    icon: path.join(__dirname, 'icon.png')
		  });
		};

		var getSubName = function(videoName){
			var videoNameWithoutFormat = videoName.slice(0, (videoName.lastIndexOf(".") - 1 >>> 0) + 2);
		  return videoNameWithoutFormat + appConfig.subExtension.value;
		};

		var changeVideoStatus = function(id, status){
			$scope.$apply(function () {
		    $scope.data.videos[id].status = status;
		  });
		};

		var downloadSubtitle = function(fileId, url, fileName){
			// @TODO: check if url is duplicated. Sometimes
			// OpenSubtitles is returning wrong sub in a TV Show
		  var file = fs.createWriteStream(fileName);
		  var request = http.get(url, function(response) {
		  	downloadsCount++;
		  	console.log(downloadsCount);
		  	changeVideoStatus(fileId, 'complete');
		    response.pipe(file);
		    if(downloadsCount === $scope.data.videos.length){
			    sendCompletedNotification();
		    }
		  });
		};

		$scope.onDropFiles = function(videos){
			
			for(var i = 0; i < videos.length; i++){
				var file = videos[i];
				file.id = i;
				file.status = 'loading';
				$scope.$apply(function () {
			    $scope.data.videos[i] = file;
			  });
				OpenSubtitles.query(file.id, file.name, file.path, file.size)
				.then(function(subtitles){
			    	var subName = getSubName(subtitles.file.path);
			    	var key = Object.keys(subtitles)[0];
			    	if(subtitles.file.hasUrl){
							downloadSubtitle(subtitles.file.id, subtitles[key].url, subName);
						}
						else{
							changeVideoStatus(subtitles.file.id, 'error');
						}
				});
			}
		};

	}]);
})();