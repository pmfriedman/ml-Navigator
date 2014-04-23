Navigator.NavigatorModule.Configure();
Flashy.FlashyModule.Configure();

var app = angular.module("app", [Navigator.NavigatorModule.Name, Flashy.FlashyModule.Name, 'ngRoute']);

app.constant('urlPrefix', {
	navigator: '/navigator/',
	flashy: '/flashy/'
});

app.config(['$routeProvider', 'urlPrefix', function($routeProvider, urlPrefix) {
	$routeProvider.
		when(urlPrefix.flashy, {
			templateUrl: 'Modules/Flashy/FlashyView.html',
		}).
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