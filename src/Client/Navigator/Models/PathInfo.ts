/// <reference path="../references.ts" />

module Models {
    export class PathInfo {

        pathType : PathType;
        lastPart : string;
        lastPartDisplay : string;
        databaseName : string = "";
        pathInDatabase : string = "";

        constructor(public path : string) {
            this.setPathType(this.path);
        }

        static FromFullPath(path : string) {
            return new PathInfo(path);
        }

        static FromParts(databaseName : string, pathWithinDatabase : string) {
            return new PathInfo(databaseName + "/" + pathWithinDatabase);
        }

        private setPathType(path : string) {
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
                        this.pathType = PathType.Root;
                    } else {
                        this.pathType = PathType.Database;
                    }
                } else if (this.lastPart == "") {
                    this.lastPart = parts[parts.length - 2];
                    this.pathType = PathType.Directory;
                } else {
                    this.pathType = PathType.Document;
                }
            }

            this.lastPartDisplay = this.getDisplayForPart(this.lastPart);
        }

        private getDisplayForPart (part : string) {
            // make friendly if empty
            var friendly = part ? part : ".";
            if (this.pathType != Models.PathType.Document) {
                friendly += "/";
            }
            return friendly;
        }

    }
}
