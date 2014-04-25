/// <reference path="../references.ts" />
var Navigator;
(function (Navigator) {
    var PathInfo = (function () {
        function PathInfo(path) {
            // strip off leading slash
            if (path.indexOf("/") === 0)
                path = path.substr(1);
            this.path = path;
            this.databaseName = "";
            this.pathInDatabase = "";
            this.setPathType(this.path);
        }
        PathInfo.FromFullPath = function (path) {
            return new PathInfo(path);
        };

        PathInfo.FromParts = function (databaseName, pathWithinDatabase) {
            return new PathInfo(databaseName + "/" + pathWithinDatabase);
        };

        PathInfo.prototype.setPathType = function (path) {
            var parts = path.split('/');
            this.lastPart = parts[parts.length - 1];

            if (parts.length > 0) {
                this.databaseName = parts[0];

                var firstSlash = path.indexOf('/');
                this.pathInDatabase = "";
                if (parts.length > 1) {
                    this.pathInDatabase = path.substr(firstSlash + 1);
                }

                if (parts.length == 1) {
                    if (this.databaseName === "") {
                        this.pathType = 3 /* Root */;
                    } else {
                        this.pathType = 0 /* Database */;
                    }
                } else if (this.lastPart == "") {
                    this.lastPart = parts[parts.length - 2];
                    this.pathType = 1 /* Directory */;
                } else {
                    this.pathType = 2 /* Document */;
                }
            }

            this.lastPartDisplay = this.getDisplayForPart(this.lastPart);
        };

        PathInfo.prototype.getDisplayForPart = function (part) {
            // make friendly if empty
            var friendly = part ? part : ".";
            if (this.pathType != 2 /* Document */) {
                friendly += "/";
            }
            return friendly;
        };
        return PathInfo;
    })();
    Navigator.PathInfo = PathInfo;
})(Navigator || (Navigator = {}));
//# sourceMappingURL=PathInfo.js.map
