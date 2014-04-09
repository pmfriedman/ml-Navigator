module MarkLogic {

    export interface  IDirectoryService {
        getDocumentContents(pathInfo: Models.PathInfo) : JQueryPromise<string>;
        getPathContents(pathInfo: Models.PathInfo) : JQueryPromise<Models.PathInfo[]>;
        getPathParts(pathInfo: Models.PathInfo) : Models.PathInfo[];
    }

    export class DirectoryService implements IDirectoryService {

        getPathContents = (pathInfo: Models.PathInfo) : JQueryPromise<Models.PathInfo[]> => {

            var deferred = $.Deferred();

            if (pathInfo.pathType === Models.PathType.Root) {
                Container.server.getAllDatabases().then((databases) => {
                    var contents : Models.PathInfo[] = [];

                    databases.forEach((database) => {
                        contents.push(Models.PathInfo.FromParts(database, ""));
                    });
                    deferred.resolve(contents);

                });

            } else {

                Container.server.getSubDirectoriesAsync(pathInfo.databaseName, pathInfo.pathInDatabase).then((childPaths : string[]) => {
                    var contents : Models.PathInfo[] = [];

                    childPaths.forEach((childPath) => {
                        contents.push(Models.PathInfo.FromParts(pathInfo.databaseName, childPath));
                    });
                    deferred.resolve(contents);
                });

            }

            return deferred.promise();
        };

        getPathParts = (pathInfo : Models.PathInfo) => {

            var parts : Models.PathInfo[] = [];

            var pathParts = pathInfo.path.split('/');

            var currentPath = "";
            for (var i = 0; i < pathParts.length; i++) {
                if (i == pathParts.length - 1 && pathParts[i] === "")
                    continue;
                currentPath += pathParts[i];
                if (pathInfo.pathType !== Models.PathType.Document || i !== pathParts.length - 1)
                    currentPath += "/";
                parts.push(new Models.PathInfo(currentPath));
            }


            if (parts.length === 0)
                parts.push(new Models.PathInfo(""));

            return parts;
        };


        getDocumentContents = (pathInfo: Models.PathInfo) : JQueryPromise<string> => {
            if (pathInfo.pathType !== Models.PathType.Document) {
                throw "Not a Document path";
            }


            var deferred = $.Deferred();

            Container.server.getDocumentContent(pathInfo.databaseName, pathInfo.pathInDatabase).then((data) => deferred.resolve(data));

            return deferred.promise();
        }
    }
}
