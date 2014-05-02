var Navigator;

(function (Navigator) {

	var SearchService = (function () {

		function SearchService($http, $log) {

			var _this = this;
			this.$http = $http;
			this.$log = $log;

            this.getMatches = function(pattern) {
            	var deferred = $.Deferred();

            	setTimeout(function() {
            		deferred.resolve( ["hi", "there"]);
            	},
            	1000);

            	return deferred.promise();

            };

		};

		SearchService.Name = "SearchService";

		return SearchService;

	})();

	Navigator.SearchService = SearchService;

})(Navigator || (Navigator = {}))