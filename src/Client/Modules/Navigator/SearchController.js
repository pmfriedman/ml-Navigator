var Navigator;

(function(Navigator) {
	
	SearchController = (function () {

		function SearchController($scope, $log, $routeParams, $location, urlPrefix, SearchService) {
			var _this = this;
			_this.SearchService = SearchService;
			_this.urlPrefix = urlPrefix;
			var pathInDb = $routeParams.pathInDb || "";
			$scope.pathInfo = new Navigator.PathInfo(pathInDb);

			$scope.pattern = "";
			$scope.getMatches = function(pattern) {
				return SearchService.getMatches($scope.pathInfo.databaseName, pattern);

			};

			$scope.patternSelected = function(item) {
				var pathinfo = $scope.pathInfo;
				var db = pathinfo.databaseName;
				var newPathInfo = Navigator.PathInfo.FromParts(db, item);
				var newPath = _this.urlPrefix.navigator.url + newPathInfo.path
				$log.debug("new path: " + newPath);
				$location.path(newPath);
			}

		};

		SearchController.Name = "SearchController";

		return SearchController;

	})();

	Navigator.SearchController = SearchController;

	
})(Navigator || (Navigator = {}))