(function(){
	'use strict';

	angular.module('subsApp')
	.controller('homeCtrl',['$scope', 'Config',
		function($scope, Config){

		var http = require("http");
		var path = require('path');
		var fs 	 = require("fs");
		var OS 	 = require("opensubtitles-api");

		var appConfig = Config.read();

		// @TODO: update useragent
		var OpenSubtitles = new OS({
	    useragent:'OSTestUserAgent',
	    ssl: true
		});

		$scope.data = {};
		$scope.data.loading = false;

		var downloadSubtitle = function(url, fileName){
		  var file = fs.createWriteStream(fileName);
		  var request = http.get(url, function(response) {
		    response.pipe(file);
			  setLoading(false);
				new Notification('Download complete',   {
			    title: "Download complete",
			    body: "Enjoy your video :)",
			    icon: path.join(__dirname, 'icon.png')
			  });
		  });
		};

		var getFileExtension = function(fileName){
		  return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
		};

		var findSubtitles = function(name, path, size){
			OpenSubtitles.search({
		    sublanguageid: appConfig.language.value,
		    path: path,
		    filename: name,
		    filesize: size,
		    extensions: [appConfig.subExtension.value]
			}).then(function (subtitles) {
				if(Object.keys(subtitles).length){
					var fileExtension = getFileExtension(name);
			    var subName = path.replace(fileExtension, appConfig.subExtension.value);
			    var key = Object.keys(subtitles)[0];
			    downloadSubtitle(subtitles[key].url, subName);
				}
				else{
					// @TODO: Show message saying that couldn't find subs
					setLoading(false);
				}
			});
		};

		document.addEventListener('drop',function(event){
		  setLoading(true);
		 	if(event.dataTransfer.files.length > 0){
		 		var file = event.dataTransfer.files[0];
		 		findSubtitles(file.name, file.path, file.size);
			}
		  event.preventDefault();
		  return false;
		}, false);

		document.addEventListener('dragover',function(event){
		  event.preventDefault();
		  return false;
		}, false);

		var setLoading = function(value){
			$scope.$apply(function() {
        $scope.data.loading = value;
      });
		};

	}]);
})();