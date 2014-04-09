/// <reference path="references.ts" />

class Server {
    getSubDirectoriesAsync(databaseName : string, parentPath : string) : JQueryPromise<string[]> {

        var deferred : JQueryDeferred<string[]> = $.Deferred();
        $.getJSON(
            "/Server/dir.xqy?db=" + databaseName + "&urimatch=" + parentPath,
            function (data) {
                deferred.resolve(data);
            }

        )

        return deferred.promise();
    }

    getAllDatabases() : JQueryPromise<string[]> {

        var deferred : JQueryDeferred<string[]> = $.Deferred();
        $.getJSON(
            "/Server/db.xqy",
            function (data) {
                deferred.resolve(data);
            }

        )

        return deferred.promise();
    }

    getDocumentContent(databaseName : string, documentPath : string) : JQueryPromise<string> {

        var deferred : JQueryDeferred<string> = $.Deferred();

        $.getJSON(
            "/Server/doc.xqy?db=" + databaseName + "&uri=" + documentPath,
            function (data) {
                deferred.resolve(data);
            }

        )

        return deferred.promise();
    }
}
