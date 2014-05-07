var Permissions;

(function (Permissions) {
	var PermissionsModule = (function () {
		function PermissionsModule() {

		};
		PermissionsModule.Name = "Permissions";
		PermissionsModule.Configure = function() {
			var module = angular.module(PermissionsModule.Name, ['app']);

			module.value('CurrentUserPermissions', {});

			module.run(['CurrentUserPermissions', '$http', function(CurrentUserPermissions, $http) {

		        $http({method:'GET', url:"/Server/Security/permissions.xqy"})
	        	.success(function(data) {
	        		CurrentUserPermissions.data = data;
	        	});				
			}]);

		};

		return PermissionsModule;

	})();
	Permissions.PermissionsModule = PermissionsModule;
})(Permissions || (Permissions = {}));