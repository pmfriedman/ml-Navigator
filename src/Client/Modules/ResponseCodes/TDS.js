var ResponseCodes;

(function(ResponseCodes) {
	var TDS = (function() {
		function TDS (name) {

			this.name = name;

		}

		return TDS;

	})();

	ResponseCodes.TDS = TDS;

})(ResponseCodes || (ResponseCodes = {}));