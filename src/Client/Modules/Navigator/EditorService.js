var Navigator;

(function (Navigator) {

	var EditorService = (function () {

		function EditorService() {

            this.getDocumentContents = function ($http, pathInfo) {
                if (pathInfo.pathType !== 2 /* Document */) {
                    throw "Not a Document path";
                }

                var deferred = $.Deferred();

                $http({method:'GET', url:"/Server/doc.xqy?db=" + pathInfo.databaseName + "&uri=" + pathInfo.pathInDatabase })
	        	.success(function(data) {
	        		var unwrappedData = angular.fromJson(data);
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