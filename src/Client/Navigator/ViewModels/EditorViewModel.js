/// <reference path="../references.ts" />
var ViewModels;
(function (ViewModels) {
    var EditorViewModel = (function () {
        function EditorViewModel() {
            var _this = this;
            // **** dynamic view data
            this.documentContent = ko.observable("");
            // ****  Init functions
            this.init = function () {
                _this.currentPath = Container.pathObservable;
                _this.setupSubscriptions();
            };
            this.setupSubscriptions = function () {
                // update from data sync
                _this.currentPath.subscribeChanged(_this.updateViewDataFromPath);
            };
            this.updateViewDataFromPath = function () {
                var pathInfo = new Models.PathInfo(_this.currentPath());
                if (pathInfo.pathType === 2 /* Document */) {
                    Container.directoryService.getDocumentContents(pathInfo).then(function (contents) {
                        return _this.documentContent(contents);
                    });
                }
            };
        }
        return EditorViewModel;
    })();
    ViewModels.EditorViewModel = EditorViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=EditorViewModel.js.map
