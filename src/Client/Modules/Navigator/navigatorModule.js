/*var navigatorModule = angular.module("navigatorModule", []);

navigatorModule.controller('explorerController', explorerController);
*/
var Navigator;

(function (Navigator) {
	var NavigatorModule = (function () {
		function NavigatorModule() {

		};
		NavigatorModule.Name = "Navigator";
		NavigatorModule.Configure = function() {
			var module = angular.module(NavigatorModule.Name, ['ui.bootstrap', 'ui.codemirror', 'app']);


			// configure
			AngularExtensions.Config.ConfigureMessaging(NavigatorModule.Name);
			AngularExtensions.Config.ConfigureHashBangLocation(NavigatorModule.Name);

			// services
			module.factory('explorerService', function(RootPath) {
				return new Navigator.ExplorerService(RootPath);
			});
			module.factory(Navigator.EditorService.Name, function($http, $log, RootPath) {
				return new Navigator.EditorService($http, $log, RootPath);
			});
			module.factory(Navigator.SearchService.Name, function($http, $log, RootPath) {
				return new Navigator.SearchService($http, $log, RootPath);
			});



			// controllers
			module.controller(Navigator.ExplorerController.Name, Navigator.ExplorerController);
			module.controller(Navigator.EditorController.Name, Navigator.EditorController);
			module.controller(Navigator.SearchController.Name, Navigator.SearchController);
			module.controller(Navigator.MetadataModalController.Name, Navigator.MetadataModalController);

		};

		return NavigatorModule;

	})();
	Navigator.NavigatorModule = NavigatorModule;
})(Navigator || (Navigator = {}));