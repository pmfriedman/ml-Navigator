/// <reference path="references.ts" />
var Server = (function () {
    function Server() {
    }
    Server.prototype.getSubDirectoriesAsync = function (databaseName, parentPath) {
        var deferred = $.Deferred();
        $.getJSON("/Server/dir.xqy?db=" + databaseName + "&urimatch=" + parentPath, function (data) {
            deferred.resolve(data);
        });

        return deferred.promise();
    };

    Server.prototype.getAllDatabases = function () {
        var deferred = $.Deferred();
        $.getJSON("/Server/db.xqy", function (data) {
            deferred.resolve(data);
        });

        return deferred.promise();
    };

    Server.prototype.getDocumentContent = function (databaseName, documentPath) {
        var deferred = $.Deferred();

        $.getJSON("/Server/doc.xqy?db=" + databaseName + "&uri=" + documentPath, function (data) {
            deferred.resolve(data);
        });

        return deferred.promise();
    };
    return Server;
})();
//# sourceMappingURL=Server.js.map
