var ResponseCodes;
(function (ResponseCodes) {
	function ResponseCodesModule = (function() {

		function ResponseCodesModule() {

		};

		ResponseCodesModule.Name = "ResponseCodes";
		ResponseCodesModule.Configure = function() {

			angular.module(ResponseCodesModule.Name, []);

		};

		return ResponseCodesModule;

	})();

	ResponseCodes.ResponseCodesModule = ResponseCodesModule;

})(ResponseCodes || (ResponseCodes = {}))