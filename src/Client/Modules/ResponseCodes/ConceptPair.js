var ResponseCodes;

(function(ResponseCodes) {
	var ConceptPair = (function() {
		function ConceptPair (hubConcept, tdsConcept) {

			this.hubConcept = hubConcept;
			this.tdsConcept = tdsConcept;

		}

		return ConceptPair;

	})();

	ResponseCodes.ConceptPair = ConceptPair;

})(ResponseCodes || (ResponseCodes = {}));