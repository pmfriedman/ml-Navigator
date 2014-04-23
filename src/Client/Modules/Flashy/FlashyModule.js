var Flashy;
(function (Flashy) {
	var FlashyModule = (function() {

		function FlashyModule() {

		};

		FlashyModule.Name = "Flashy";
		FlashyModule.Configure = function() {
			var module = angular.module(FlashyModule.Name, []);
			module.controller("FlashyController", Flashy.FlashyController);
		};

		return FlashyModule;

	})();
	Flashy.FlashyModule = FlashyModule;

})(Flashy || (Flashy = {}))