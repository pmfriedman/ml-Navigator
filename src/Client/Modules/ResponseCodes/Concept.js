var ResponseCodes;

(function(ResponseCodes) {
	var Concept = (function() {
		function Concept (code, description) {

			this.code = code;
			this.description = description;

		}

		return Concept;

	})();

	ResponseCodes.Concept = Concept;

})(ResponseCodes || (ResponseCodes = {}));