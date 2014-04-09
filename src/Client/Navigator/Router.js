/// <reference path="references.ts" />
var Router = (function () {
    function Router() {
        var _this = this;
        this.init = function () {
            _this.currentPath = Container.pathObservable;
            _this.currentPath.subscribeChanged(_this.updateHashFromPath);

            Sammy(function (context) {
                context.get('.*', function (c) {
                    Sammy.log("Caught by Sammy");
                    _this.updatePathFromHash();
                });
            }).run('#/');
        };
        this.navigate = function (pathInfo) {
            _this.currentPath(pathInfo.path);
        };
        this.updateHashFromPath = function () {
            var newHash = "#/" + _this.currentPath();
            Sammy.log("Updating Hash from Path: " + _this.currentPath());
            window.location.hash = newHash;
        };
        this.updatePathFromHash = function () {
            Sammy.log("Updating Path from Hash: " + window.location.hash.substr(2, window.location.hash.length - 1));
            _this.currentPath(window.location.hash.substr(2, window.location.hash.length - 1));
        };
    }
    return Router;
})();
//# sourceMappingURL=Router.js.map
