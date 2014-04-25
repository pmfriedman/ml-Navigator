var Flashy;
(function(Flashy) {
	var FlashyController = (function() {

		function FlashyController($scope) {
			$scope.message = "Here's my flashy message!";

		};

		FlashyController.Name = "FlashyController";

		return FlashyController;

	})();
	Flashy.FlashyController = FlashyController;

})(Flashy || (Flashy = {}))