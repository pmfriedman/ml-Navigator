var Navigator;

(function (Navigator) {
	var ExplorerController = (function () {
		function ExplorerController($scope, $rootScope, explorerService, $http, $location, $log) {
			_this = this;
			$scope.databases = [];
			$scope.currentPathParts = []
			$scope.currentPathContents = [];
			$scope.selectedDatabase = null;
			this.$http = $http;
			this.explorerService = explorerService;

			$scope.populateDatabases = function () {	
				
				var promise = _this.explorerService.getAllDatabases(_this.$http).then(function(data) { 
						$scope.databases = data;
					});

				return promise;
			};

			$scope.onDatabaseSelected = function() {				
				var pathInfo = Navigator.PathInfo.FromParts("", "");
		        if ($scope.selectedDatabase)
		            pathInfo = Navigator.PathInfo.FromParts($scope.selectedDatabase.databaseName, "");
		        var newPath = pathInfo.databaseName;

		        $location.path(newPath);
			};

			// React to external changes
            $scope.updateViewDataFromPath = function (path) {
                $log.debug("updating viewdata from path.  currentPath=" + path);

                var pathInfo = new Navigator.PathInfo(path);

                // database
                var databaseName = pathInfo.databaseName;
                var databaseInfo = $.grep($scope.databases, function (db) {
                    return db.databaseName === databaseName;
                })[0];
                $scope.selectedDatabase = databaseInfo;

                // directory contents
                if (pathInfo.pathType !== 2 /* Document */) {
                    _this.explorerService.getDirectoryContents(_this.$http, pathInfo).then(function (contents) {
                        $scope.currentPathContents = contents;
                        var pathParts = _this.explorerService.getPathParts(pathInfo);
                        $scope.currentPathParts = pathParts;
                    });
                }
            };

		    $scope.populateDatabases()
		    	.then(function() { 
					$rootScope.$watch(
						function() {
							return $location.path();
						}, 
						function() {
							$scope.updateViewDataFromPath($location.path());
						}
					);
		    	} );

		}
		ExplorerController.Name = "ExplorerController";
		return ExplorerController;
	})();
	Navigator.ExplorerController = ExplorerController;
})(Navigator || (Navigator = { }));