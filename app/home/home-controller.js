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

		var downloadSubtitle = function(url, fileName, last){
			// @TODO: check if url is duplicated. Sometimes
			// OpenSubtitles is returning wrong sub in a TV Show
		  var file = fs.createWriteStream(fileName);
		  var request = http.get(url, function(response) {
		    response.pipe(file);
		    if(last){
			    new Notification('Download complete', {
				    title: "Download complete",
				    body: "Enjoy your video/s :)",
				    icon: path.join(__dirname, 'icon.png')
				  });
		    }
		  });
		};

		var getSubName = function(videoName){
			var videoNameWithoutFormat = videoName.slice(0, (videoName.lastIndexOf(".") - 1 >>> 0) + 2);
		  return videoNameWithoutFormat + appConfig.subExtension.value;
		};

		$scope.onDropFiles = function(videos){
			for(var i = 0; i < videos.length; i++){
				var file = videos[i];
				OpenSubtitles.query(file.name, file.path, file.size)
				.then(function(subtitles){
			    	var subName = getSubName(subtitles.file.path);
			    	var key = Object.keys(subtitles)[0];
			    	if(subtitles.file.hasUrl){
							downloadSubtitle(subtitles[key].url, subName, i == videos.length);
						}
						else{
							// @TODO: Show message saying that couldn't find subs
							console.log('no subs');
						}
				});
			}
		};

	}]);
})();