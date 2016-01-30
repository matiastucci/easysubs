'use strict';
angular.module('subsApp')
.factory('OpenSubtitles',['Config', function(Config){

	var OS 	 = require("opensubtitles-api");
	var appConfig = Config.read();
	var OpenSubtitles = new OS({
    useragent:'EasysubsNJ',
    ssl: true
	});

	return {
		query: function(name, path, size){
			return OpenSubtitles.search({
		    sublanguageid: appConfig.language.value,
		    path: path,
		    filename: name,
		    filesize: size,
		    extensions: [appConfig.subExtension.value]
			}).then(function(sub){
				var hasUrl = Object.keys(sub).length ? true : false;
				sub.file = {
					name: name,
					path: path,
					hasUrl: hasUrl
				};
				return sub;
			});
		}
	};

}]);