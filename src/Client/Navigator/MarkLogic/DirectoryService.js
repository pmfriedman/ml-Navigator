var MarkLogic;
(function (MarkLogic) {
    var DirectoryService = (function () {
        function DirectoryService() {
            this.getPathContents = function (pathInfo) {
                var deferred = $.Deferred();

                if (pathInfo.pathType === 3 /* Root */) {
                    Container.server.getAllDatabases().then(function (databases) {
                        var contents = [];

                        databases.forEach(function (database) {
                            contents.push(Models.PathInfo.FromParts(database, ""));
                        });
                        deferred.resolve(contents);
                    });
                } else {
                    Container.server.getSubDirectoriesAsync(pathInfo.databaseName, pathInfo.pathInDatabase).then(function (childPaths) {
                        var contents = [];

                        childPaths.forEach(function (childPath) {
                            contents.push(Models.PathInfo.FromParts(pathInfo.databaseName, childPath));
                        });
                        deferred.resolve(contents);
                    });
                }

                return deferred.promise();
            };
            this.getPathParts = function (pathInfo) {
                var parts = [];

                var pathParts = pathInfo.path.split('/');

                var currentPath = "";
                for (var i = 0; i < pathParts.length; i++) {
                    if (i == pathParts.length - 1 && pathParts[i] === "")
                        continue;
                    currentPath += pathParts[i];
                    if (pathInfo.pathType !== 2 /* Document */ || i !== pathParts.length - 1)
                        currentPath += "/";
                    parts.push(new Models.PathInfo(currentPath));
                }

                if (parts.length === 0)
                    parts.push(new Models.PathInfo(""));

                return parts;
            };
            this.getDocumentContents = function (pathInfo) {
                if (pathInfo.pathType !== 2 /* Document */) {
                    throw "Not a Document path";
                }

                var deferred = $.Deferred();

                Container.server.getDocumentContent(pathInfo.databaseName, pathInfo.pathInDatabase).then(function (data) {
                    return deferred.resolve(data);
                });

                return deferred.promise();
            };
        }
        return DirectoryService;
    })();
    MarkLogic.DirectoryService = DirectoryService;
})(MarkLogic || (MarkLogic = {}));
//# sourceMappingURL=DirectoryService.js.map
