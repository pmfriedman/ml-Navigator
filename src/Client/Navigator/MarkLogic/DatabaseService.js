/// <reference path="../references.ts" />
var MarkLogic;
(function (MarkLogic) {
    var DatabaseService = (function () {
        function DatabaseService() {
            this.getAllDatabases = function () {
                var deferred = $.Deferred();

                Container.server.getAllDatabases().then(function (databaseNames) {
                    var databases = [];

                    databaseNames.forEach(function (databaseName) {
                        databases.push(new Models.DatabaseInfo(databaseName));
                    });
                    deferred.resolve(databases);
                });

                return deferred.promise();
            };
        }
        return DatabaseService;
    })();
    MarkLogic.DatabaseService = DatabaseService;
})(MarkLogic || (MarkLogic = {}));
//# sourceMappingURL=DatabaseService.js.map
