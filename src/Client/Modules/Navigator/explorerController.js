var Navigator;

(function (Navigator) {
	var ExplorerController = (function () {
		function ExplorerController($scope, $rootScope, explorerService, $http, $location, $log, $routeParams, urlPrefix, $modal) {
			_this = this;
			$scope.databases = [];
			$scope.currentPathParts = []
			$scope.currentPathContents = [];
			$scope.selectedDatabase = null;
			$scope.pathInDb = $routeParams.pathInDb || "";
			this.$http = $http;
			this.explorerService = explorerService;

			$scope.urlPrefix = urlPrefix.navigator;


			$log.debug("path in db: " + $routeParams.pathInDb);

			$scope.populateDatabases = function () {	
				
				var promise = _this.explorerService.getAllDatabases(_this.$http).then(function(data) { 
						$scope.databases = data; // database

                		var pathInfo = new Navigator.PathInfo($scope.pathInDb);
		                var databaseName = pathInfo.databaseName;
		                var databaseInfo = $.grep($scope.databases, function (db) {
		                    return db.databaseName === databaseName;
		                })[0];
		                $scope.selectedDatabase = databaseInfo;
					});

				return promise;
			};

			$scope.onDatabaseSelected = function() {				
				var pathInfo = Navigator.PathInfo.FromParts("", "");
		        if ($scope.selectedDatabase)
		            pathInfo = Navigator.PathInfo.FromParts($scope.selectedDatabase.databaseName, "");
		        var newPath = pathInfo.databaseName;

		        $location.path("navigator/" + newPath);
			};

			// React to external changes
            $scope.updateViewDataFromPath = function (path) {
                $log.debug("updating viewdata from path.  currentPath=" + path);

                var pathInfo = new Navigator.PathInfo(path);

                var pathToGetContentsOf = pathInfo;
                if (pathInfo.pathType === 2 /* Document */) {
                	pathToGetContentsOf = new Navigator.PathInfo(pathInfo.getPathStrippedOfDocumentName());
                };
				_this.explorerService.getDirectoryContents(_this.$http, pathToGetContentsOf).then(function (contents) {
                    $scope.currentPathContents = contents;
                    var pathParts = _this.explorerService.getPathParts(pathInfo);
                    $scope.currentPathParts = pathParts;
                });
            };

            $scope.openModal = function(pi) {
            	$modal.open({
            		templateUrl: 'myModalContent.html',
            		controller: Navigator.MetadataModalController,
            		resolve: {
            			pathInfo: function() {
            				return pi;
            			}
            		}
            	});

            };

		    $scope.populateDatabases();
		    $scope.updateViewDataFromPath($scope.pathInDb);

		}
		ExplorerController.Name = "ExplorerController";
		return ExplorerController;
	})();
	Navigator.ExplorerController = ExplorerController;
})(Navigator || (Navigator = { }));