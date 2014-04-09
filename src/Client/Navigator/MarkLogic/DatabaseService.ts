/// <reference path="../references.ts" />

module MarkLogic {
    export class DatabaseService {
        getAllDatabases : () => JQueryPromise<Models.DatabaseInfo[]> = () =>  {

            var deferred = $.Deferred();

            Container.server.getAllDatabases().then((databaseNames : string[]) => {
                var databases : Models.DatabaseInfo[] = [];

                databaseNames.forEach((databaseName) => {
                    databases.push(new Models.DatabaseInfo(databaseName));
                });
                deferred.resolve(databases);
            });

            return deferred.promise();
        }
    }
}
