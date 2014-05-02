var Navigator;

(function(Navigator) {
	
	SearchController = (function () {

		function SearchController($scope, $log, SearchService) {
			var _this = this;
			_this.SearchService = SearchService;

			$scope.pattern = "";
			$scope.getMatches = function(pattern) {
				return SearchService.getMatches(pattern);

			};

		};

		SearchController.Name = "SearchController";

		return SearchController;

	})();

	Navigator.SearchController = SearchController;

	
})(Navigator || (Navigator = {}))