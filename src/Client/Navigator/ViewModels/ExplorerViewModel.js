/// <reference path="../references.ts" />
var ViewModels;
(function (ViewModels) {
    var ExplorerViewModel = (function () {
        function ExplorerViewModel() {
            var _this = this;
            // **** static view data
            this.databases = ko.observableArray([]);
            // **** dynamic view data
            this.selectedDatabase = ko.observable();
            this.currentPathParts = ko.observableArray([]);
            this.currentPathContents = ko.observableArray([]);
            // ****  Init functions
            this.init = function () {
                _this.currentPath = Container.pathObservable;
                var promise = _this.populateDatabases().then(_this.setupSubscriptions);
                return promise;
            };
            this.populateDatabases = function () {
                var promise = Container.databaseService.getAllDatabases().then(function (dbs) {
                    _this.databases(dbs);
                });
                return promise;
            };
            this.setupSubscriptions = function () {
                // update from data sync
                _this.currentPath.subscribeChanged(function () {
                    _this.updateViewDataFromPath();
                });

                // update to data sync
                _this.selectedDatabase.subscribeChanged(_this.onSelectedDatabaseChanged);
            };
            // React to external changes
            this.updateViewDataFromPath = function () {
                Sammy.log("updating viewdata from path.  currentPath=" + _this.currentPath());

                var pathInfo = new Models.PathInfo(_this.currentPath());

                // database
                var databaseName = pathInfo.databaseName;
                var databaseInfo = $.grep(_this.databases(), function (db) {
                    return db.name === databaseName;
                })[0];
                _this.selectedDatabase(databaseInfo);

                // directory contents
                if (pathInfo.pathType !== 2 /* Document */) {
                    Container.directoryService.getPathContents(pathInfo).then(function (contents) {
                        _this.currentPathContents(contents);
                        var pathParts = Container.directoryService.getPathParts(pathInfo);
                        _this.currentPathParts(pathParts);
                    });
                }
            };
            // React to internal changes
            this.onSelectedDatabaseChanged = function () {
                Sammy.log("Database Selector changed");
                var pathInfo = Models.PathInfo.FromParts("", "");
                if (_this.selectedDatabase())
                    pathInfo = Models.PathInfo.FromParts(_this.selectedDatabase().name, "");
                var newPath = pathInfo.databaseName;

                // TODO
                if (_this.currentPath() !== newPath)
                    Sammy.log("sending message.  currentPath=" + newPath);
                _this.currentPath(newPath);
            };
        }
        return ExplorerViewModel;
    })();
    ViewModels.ExplorerViewModel = ExplorerViewModel;
})(ViewModels || (ViewModels = {}));
//# sourceMappingURL=ExplorerViewModel.js.map
