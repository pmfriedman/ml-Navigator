var Permissions;

(function (Permissions) {
	var PermissionsModule = (function () {
		function PermissionsModule() {

		};
		PermissionsModule.Name = "Permissions";
		PermissionsModule.Configure = function() {
			var module = angular.module(PermissionsModule.Name, ['app']);

			module.value('CurrentUserPermissions', {});

			module.run(['CurrentUserPermissions', '$http', 'RootPath', function(CurrentUserPermissions, $http, RootPath) {

				var deferred = $.Deferred();

		        $http({method:'GET', url: RootPath() + "Server/Security/permissions.xqy"})
	        	.success(function(data) {
	        		deferred.resolve(data);
	        	});

	        	CurrentUserPermissions.getData = deferred.promise;				
			}]);

		};

		return PermissionsModule;

	})();
	Permissions.PermissionsModule = PermissionsModule;
})(Permissions || (Permissions = {}));