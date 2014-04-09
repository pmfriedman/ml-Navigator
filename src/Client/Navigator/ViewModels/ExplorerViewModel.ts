/// <reference path="../references.ts" />

module ViewModels {
    export class ExplorerViewModel {

        // **** static view data
        databases : KnockoutObservableArray<Models.DatabaseInfo> = ko.observableArray([]);

        // **** dynamic view data
        selectedDatabase : KnockoutObservable<any> = ko.observable();
        currentPathParts : KnockoutObservableArray<Models.PathInfo> = ko.observableArray([]);
        currentPathContents : KnockoutObservableArray<Models.PathInfo> = ko.observableArray([]);

        // **** data sync to messaging
        currentPath : KnockoutObservable<string>;// = ko.observable("").syncWith(ViewModels.SubscriptionTopic.Path.toString());

        // ****  Init functions

        init = () => {
            this.currentPath = Container.pathObservable;
            var promise = this.populateDatabases().then(this.setupSubscriptions);
            return promise;

        }

        populateDatabases = () => {
            var promise = Container.databaseService.getAllDatabases().then((dbs) => {
                this.databases(dbs);
            });
            return promise;
        };

        setupSubscriptions = () => {

            // update from data sync
            this.currentPath.subscribeChanged(() => { this.updateViewDataFromPath() });

            // update to data sync
            this.selectedDatabase.subscribeChanged(this.onSelectedDatabaseChanged);

        }

        // React to external changes
        updateViewDataFromPath = () => {

            Sammy.log("updating viewdata from path.  currentPath=" + this.currentPath());

            var pathInfo = new Models.PathInfo(this.currentPath());

            // database
            var databaseName = pathInfo.databaseName;
            var databaseInfo : Models.DatabaseInfo = $.grep(this.databases(), (db) => {return db.name === databaseName})[0];
            this.selectedDatabase(databaseInfo);

            // directory contents
            if (pathInfo.pathType !== Models.PathType.Document) {
                Container.directoryService.getPathContents(pathInfo).then( (contents) => {
                    this.currentPathContents(contents);
                    var pathParts = Container.directoryService.getPathParts(pathInfo);
                    this.currentPathParts(pathParts);
                });
            }


        }

        // React to internal changes
        onSelectedDatabaseChanged = () => {
            Sammy.log("Database Selector changed");
            var pathInfo = Models.PathInfo.FromParts("", "");
            if (this.selectedDatabase())
                pathInfo = Models.PathInfo.FromParts(this.selectedDatabase().name, "");
            var newPath = pathInfo.databaseName;
            // TODO
            if (this.currentPath() !== newPath)
                Sammy.log("sending message.  currentPath=" + newPath);
            this.currentPath(newPath);
        }

    }
}
