var Navigator;

(function (Navigator) {

	var EditorService = (function () {

		function EditorService($http, $log, RootPath) {

			var _this = this;
			this.$http = $http;
			this.$log = $log;
			this.RootPath = RootPath;

            this.getDocumentContents = function (pathInfo) {
                if (pathInfo.pathType !== 2 /* Document */) {
                    throw "Not a Document path";
                }

                var deferred = $.Deferred();

                _this.$http({method:'GET', url: _this.RootPath() + "Server/doc.xqy?db=" + pathInfo.databaseName + "&uri=" + pathInfo.pathInDatabase })
	        	.success(function(data) {
	        		var unwrappedData = angular.fromJson(data);
	        		deferred.resolve(unwrappedData);
	        	});

	        	return deferred.promise();
            };

            this.save = function(pathInfo, content) {

                if (pathInfo.pathType !== 2 /* Document */) {
                    throw "Not a Document path";
                }
                var deferred = $.Deferred();

                var data = { path: pathInfo.pathInDatabase, content: content};

            	_this.$http({method:'PUT', url: _this.RootPath() + 'Server/doc-save.xqy?db=' + pathInfo.databaseName, data: angular.toJson(data)})
            	.success(function(data) {
	        		var unwrappedData = angular.fromJson(data);
	        		_this.$log.debug(unwrappedData);
	        		deferred.resolve(unwrappedData);
            	});

	        	return deferred.promise();

            };

		};

		EditorService.Name = "EditorService";

		return EditorService;

	})();

	Navigator.EditorService = EditorService;

})(Navigator || (Navigator = {}))