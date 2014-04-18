var AngularExtensions;

(function (AngularExtensions) {
	var Config = (function() {
		function Config () {
		}
		Config.ConfigureMessaging = function(appName) {

			// copied from http://stackoverflow.com/questions/11252780/whats-the-correct-way-to-communicate-between-controllers-in-angularjs
			angular
			    .module(appName)
			    .config(['$provide', function($provide){
			        $provide.decorator('$rootScope', ['$delegate', function($delegate){

			            Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
			                value: function(name, listener){
			                    var unsubscribe = $delegate.$on(name, listener);
			                    this.$on('$destroy', unsubscribe);
			                },
			                enumerable: false
			            });


			            return $delegate;
			        }]);
			    }]);



		};
		Config.ConfigureHashBangLocation = function(appName) {
			angular.module(appName)
			.config(function($locationProvider) {
				$locationProvider.html5Mode(false);
				//$locationProvider.hashPrefix('!');
			});

		};

		return Config;

	})();
	AngularExtensions.Config = Config;

})(AngularExtensions || (AngularExtensions = {}));