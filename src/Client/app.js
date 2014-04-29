Navigator.NavigatorModule.Configure();

var app = angular.module("app", [Navigator.NavigatorModule.Name, 'ngRoute']);

app.constant('urlPrefix', {
	navigator: { name: 'Documents', url: '/navigator/' }
});

app.config(['$routeProvider', 'urlPrefix', function($routeProvider, urlPrefix) {
	$routeProvider.
		when(urlPrefix.navigator.url +  ':pathInDb*', {
			templateUrl: 'Modules/Navigator/NavigatorView.html'
		}).
		when(urlPrefix.navigator.url, {
			templateUrl: 'Modules/Navigator/NavigatorView.html'
		}).
		otherwise({
			redirectTo: urlPrefix.navigator.url
		});

}]);

app.controller('navController', ['$scope', '$location', 'urlPrefix', function($scope, $location, urlPrefix){

	$scope.areas = [];
	for (var key in urlPrefix) {
 		if (urlPrefix.hasOwnProperty(key)) {
 			$scope.areas.push(urlPrefix[key]);
  		}
	}

	// set the 'active' class if the button's link matches the prefix of the current url
	$scope.navClass = function(urlPrefix) {
		var currentRoute = $location.path();
		return currentRoute.substring(0, urlPrefix.length) === urlPrefix ? 'active' : '';
	}
	
}]);