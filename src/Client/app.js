Navigator.NavigatorModule.Configure();

var app = angular.module("app", [Navigator.NavigatorModule.Name, 'ngRoute']);

app.constant('urlPrefix', {
	navigator: '/navigator/'
});

app.config(['$routeProvider', 'urlPrefix', function($routeProvider, urlPrefix) {
	$routeProvider.
		when(urlPrefix.navigator +  ':pathInDb*', {
			templateUrl: 'Modules/Navigator/NavigatorView.html'
		}).
		when(urlPrefix.navigator, {
			templateUrl: 'Modules/Navigator/NavigatorView.html'
		}).
		otherwise({
			redirectTo: urlPrefix.navigator
		});

}]);