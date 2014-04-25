var ResponseCodes;
(function (ResponseCodes) {
	var ResponseCodesModule = (function() {

		function ResponseCodesModule() {

		};

		ResponseCodesModule.Name = "ResponseCodes";
		ResponseCodesModule.Configure = function() {

			var module = angular.module(ResponseCodesModule.Name, ['app', 'ngGrid']);

			// services
			module.factory('ResponseCodesService', function() {
				return new ResponseCodes.ResponseCodesService();
			});

			// controllers
			module.controller("ResponseCodesController", ResponseCodes.ResponseCodesController);

		};

		return ResponseCodesModule;

	})();

	ResponseCodes.ResponseCodesModule = ResponseCodesModule;

})(ResponseCodes || (ResponseCodes = {}))