var Navigator;

(function (Navigator) {

	var SearchService = (function () {

		function SearchService($http, $log, RootPath) {

			var _this = this;
			this.$http = $http;
			this.$log = $log;
			this.RootPath = RootPath;

            this.getMatches = function(databaseName, pattern) {
            	var deferred = $.Deferred();


                _this.$http({method:'GET', url: _this.RootPath() + "Server/Navigator/uri-search.xqy?db=" + databaseName + "&pattern=" + pattern })
	        	.success(function(data) {
	        		var unwrappedData = angular.fromJson(data);
	        		deferred.resolve(unwrappedData);
	        	});


            	return deferred.promise();

            };

		};

		SearchService.Name = "SearchService";

		return SearchService;

	})();

	Navigator.SearchService = SearchService;

})(Navigator || (Navigator = {}))