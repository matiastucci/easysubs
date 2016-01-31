'use strict';
angular.module('subsApp')
.factory('OpenSubtitles',['Config', function(Config){

	var OS 	 = require("opensubtitles-api");
	var OpenSubtitles = new OS({
    useragent:'EasysubsNJ',
    ssl: true
	});

	return {
		query: function(id, name, path, size){
			var appConfig = Config.read();
			return OpenSubtitles.search({
		    sublanguageid: appConfig.language.value,
		    path: path,
		    filename: name,
		    filesize: size,
		    extensions: [appConfig.subExtension.value]
			}).then(function(sub){
				var hasUrl = Object.keys(sub).length ? true : false;
				sub.file = {
					id: id,
					name: name,
					path: path,
					hasUrl: hasUrl
				};
				return sub;
			});
		}
	};

}]);