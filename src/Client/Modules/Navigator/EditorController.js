var Navigator;

(function(Navigator) {
	
	EditorController = (function () {

		function EditorController($scope, $location, $rootScope, $log, $window, $routeParams, EditorService) {
			var _this = this;
			_this.EditorService = EditorService;
			_this.$window = $window;
			$scope.pathInDb = $routeParams.pathInDb || "";
			$scope.pathInfo = new Navigator.PathInfo($scope.pathInDb);

			$scope.documentContent = "";

			$scope.codeMirrorLoaded = function(mirror) {
				$scope.mirror = mirror;
				mirror.setOption('theme', "the-matrix");
				mirror.setOption('indentUnit', 4);
				mirror.setOption('tabSize', 4);
				mirror.setOption('lineNumbers', true);
				mirror.setOption('styleActiveLine', true);
				mirror.setOption('mode', "text/xml");
				mirror.setOption('extraKeys', {
	                Tab: function(cm) {
	                    if (cm.getSelection().length) {
	                        CodeMirror.commands.indentMore(cm);
	                    } else {
	                    cm.replaceSelection("    ", "end")
	                    }
	                },
	                'Shift-Tab': function(cm) {
	                    CodeMirror.commands.indentLess(cm)
	                }
	            });

	            $scope.setMirrorToWindowHeight();
			};

			$scope.setMirrorToWindowHeight = function() {
	            var height = _this.$window.innerHeight;
	            $($scope.mirror.getWrapperElement()).height(height);
			};


			angular.element($window).bind('resize', function() {
				$scope.setMirrorToWindowHeight();
			});

			// React to external changes
            $scope.updateViewDataFromPath = function (path) {
                $log.debug("editor path=" + path);

                var pathInfo = new Navigator.PathInfo(path);

                if (pathInfo.pathType === 2 /* Document */) {
                    _this.EditorService.getDocumentContents(pathInfo).then(function (contents) {
        				var prettifiedXML = vkbeautify.xml(contents);
                        return $scope.documentContent = prettifiedXML;
                    });
                }
            };

			$scope.save = function() {
				$log.debug("saving");
				_this.EditorService.save($scope.pathInfo, $scope.mirror.getDoc().getValue());
			};

			$scope.updateViewDataFromPath($scope.pathInDb);

		};

		EditorController.Name = "EditorController";

		return EditorController;

	})();

	Navigator.EditorController = EditorController;

	
})(Navigator || (Navigator = {}))