Navigator.NavigatorModule.Configure();
Permissions.PermissionsModule.Configure();

var app = angular.module("app", [Navigator.NavigatorModule.Name, Permissions.PermissionsModule.Name, 'ngRoute', 'xeditable']);

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

app.factory('RootPath', [function(){
	return function (){
		// Customize as necessary
		return '/';		
	};
}]);

app.value('ErrorIndicator', { hasErrorOccurred: false });

app.controller('AlertsController', ['$scope', 'ErrorIndicator', function($scope, ErrorIndicator){
	$scope.ErrorIndicator = ErrorIndicator;
	$scope.closeAlert = function() {
		$scope.ErrorIndicator.show = false;
	}
}]);

// intercept all http responses to display error message
app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.responseInterceptors.push(function($timeout, $q, $log, ErrorIndicator) {
		return function(promise) {
			return promise.then(function(successResponse) {
				return successResponse;

			},
			function(errorResponse) {
				ErrorIndicator.show = true;
				return errorResponse;
			});
		}
	});	
}]);

app.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
})