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
			var module = angular.module(NavigatorModule.Name, ['ui.codemirror', 'app']);


			// configure
			AngularExtensions.Config.ConfigureMessaging(NavigatorModule.Name);
			AngularExtensions.Config.ConfigureHashBangLocation(NavigatorModule.Name);

			// services
			module.factory('explorerService', function() {
				return new Navigator.ExplorerService();
			});
			module.factory(Navigator.EditorService.Name, function() {
				return new Navigator.EditorService();
			});



			// controllers
			module.controller(Navigator.ExplorerController.Name, Navigator.ExplorerController);
			module.controller(Navigator.EditorController.Name, Navigator.EditorController);

		};

		return NavigatorModule;

	})();
	Navigator.NavigatorModule = NavigatorModule;
})(Navigator || (Navigator = {}));