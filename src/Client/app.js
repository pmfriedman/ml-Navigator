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

app.controller('navController', ['$scope', '$location', 'urlPrefix', function($scope, $location, urlPrefix){

	$scope.areas = [{name: 'Documents', url: urlPrefix.navigator}];

	// set the 'active' class if the button's link matches the prefix of the current url
	$scope.navClass = function(urlPrefix) {
		var currentRoute = $location.path();
		return currentRoute.substring(0, urlPrefix.length) === urlPrefix ? 'active' : '';
	}
	
}]);