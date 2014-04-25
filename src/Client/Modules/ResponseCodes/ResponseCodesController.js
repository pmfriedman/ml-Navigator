var ResponseCodes;

(function(ResponseCodes) {
	var ResponseCodesController = (function() {

		function ResponseCodesController($scope, ResponseCodesService) {

			var _this = this;
			this.ResponseCodesService = ResponseCodesService;

			$scope.allTDSs = [];
			$scope.selectedTDS = null;
			$scope.codePairs = [];

             $scope.gridOptions = { 
             	data: 'codePairs',
             	columnDefs: [
             		{field: 'tdsConcept.code', displayName: 'TDS Code'},
             		{field: 'tdsConcept.description', displayName: 'TDS Description'},
             		{field: 'hubConcept.code', displayName: 'Hub Code'},
             		{field: 'hubConcept.description', displayName: 'Hub Description'}
         		],
         		enableCellSelection: true,
         		enableRowSelection: false,
         		enableCellEditOnFocus: true,
         		enableColumnResize: true
             };

			$scope.onTDSSelected = function() {
				_this.ResponseCodesService.getAllCodesForTDS($scope.selectedTDS).then(function(data) {
					$scope.codePairs = data;
				});

			};

			// initialize
			ResponseCodesService.getAllTDSs().then(function(data) {
				$scope.allTDSs = data;
				$scope.selectedTDS = data[0];
				$scope.onTDSSelected();
			});

		}

		return ResponseCodesController;

	})();

	ResponseCodes.ResponseCodesController = ResponseCodesController;

})(ResponseCodes || (ResponseCodes = {}))