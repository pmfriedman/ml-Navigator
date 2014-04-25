var ResponseCodes;

(function (ResponseCodes) {

	var ResponseCodesService = (function() {

		function ResponseCodesService() {

			var _this = this;

			this.getAllTDSs = function() {
				var dummyDataNames = ["TDS1", "TDS2"];
				var TDSs = [];

				for (var i = 0; i < dummyDataNames.length; i++) {
					TDSs.push(new ResponseCodes.TDS(dummyDataNames[i]));
				};

				var deferred = $.Deferred();

				deferred.resolve(TDSs);

				return deferred.promise();


			}

			this.getAllCodesForTDS = function (tds) {

				var name = tds.name;

				var deferred = $.Deferred();

				var pairs = [];

				// test data
				var hubConcept = new ResponseCodes.Concept("hub1", "first hub description");
				var tdsConcept = new ResponseCodes.Concept("tds1", "first tds description");
				var pair = new ResponseCodes.ConceptPair(hubConcept, tdsConcept);
				pairs.push(pair);

				deferred.resolve(pairs);


				return deferred.promise();
			};

		}

		return ResponseCodesService;

	})();

	ResponseCodes.ResponseCodesService = ResponseCodesService;

})(ResponseCodes || (ResponseCodes = {}))