var Navigator;

(function (Navigator) {
	var ExplorerService = (function() {
		function ExplorerService(RootPath) {
            var _this = this;
            this.RootPath = RootPath;
			this.getAllDatabases = function ($http) {
                var deferred = $.Deferred();

                this.getAllDatabaseNames($http).then(function (databaseNames) {
                    var databases = [];

                    databaseNames.forEach(function (databaseName) {
                        databases.push(Navigator.PathInfo.FromParts(databaseName, ""));
                    });
                    deferred.resolve(databases);
                });

                return deferred.promise();
            };
            this.getAllDatabaseNames = function($http) {
            	var deferred = $.Deferred();
		        $http({method:'GET', url: _this.RootPath() + "Server/db.xqy"})
	        	.success(function(data) {
	        		deferred.resolve(data);
	        	});

		        return deferred.promise();
            };

            this.getDirectoryContents = function ($http, pathInfo) {
                var deferred = $.Deferred();

                if (pathInfo.pathType === 3 /* Root */) {
                    this.getAllDatabaseNames($http).then(function (databases) {
                        var contents = [];

                        databases.forEach(function (database) {
                            contents.push(Navigator.PathInfo.FromParts(database, ""));
                        });
                        deferred.resolve(contents);
                    });
                } else {
                    this.getDirectoryContentsNames($http, pathInfo.databaseName, pathInfo.pathInDatabase).then(function (data) {
                        var contents = [];

                        data.forEach(function (serverContent) {
                            contents.push(Navigator.PathInfo.FromParts(pathInfo.databaseName, serverContent.uri, serverContent.collections));
                        });                        
                        deferred.resolve(contents);
                    });
                }

                return deferred.promise();
            };


            this.getDirectoryContentsNames = function ($http, databaseName, parentPath) {
		        var deferred = $.Deferred();
		        $http({method:'GET', url: _this.RootPath() + "Server/Navigator/directory-contents.xqy?db=" + databaseName + "&urimatch=" + parentPath})
		        .success(function(data){
		        	deferred.resolve(data);
		        });

		        return deferred.promise();
		    };

            this.getPathParts = function (pathInfo) {
                var parts = [];

                var pathParts = pathInfo.path.split('/');

                var currentPath = "";
                for (var i = 0; i < pathParts.length; i++) {
                    if (i == pathParts.length - 1 && pathParts[i] === "")
                        continue;
                    currentPath += pathParts[i];
                    if (pathInfo.pathType !== 2 /* Document */ || i !== pathParts.length - 1)
                        currentPath += "/";
                    parts.push(new Navigator.PathInfo(currentPath));
                }

                if (parts.length === 0)
                    parts.push(new Navigator.PathInfo(""));

                return parts;
            };

		}
		ExplorerService.Name = "ExplorerService"
		return ExplorerService;
	})();
	Navigator.ExplorerService = ExplorerService;

})(Navigator || (Navigator = {}));