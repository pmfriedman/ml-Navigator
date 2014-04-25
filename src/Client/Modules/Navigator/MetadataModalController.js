var Navigator;
(function(Navigator) {
	var MetadataModalController = (function() {
		function MetadataModalController($scope, $log, pathInfo) {
            	$scope.pathInfo = pathInfo;

		}
		MetadataModalController.prototype.Name = "MetadataModalController";
		return MetadataModalController;

	})();
	Navigator.MetadataModalController = MetadataModalController;

})(Navigator || (Navigator = {}))