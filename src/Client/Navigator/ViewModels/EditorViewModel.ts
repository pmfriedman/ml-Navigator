/// <reference path="../references.ts" />

module ViewModels {
    export class EditorViewModel {

        // **** data sync to messaging
        currentPath : KnockoutObservable<string>;

        // **** dynamic view data
        documentContent : KnockoutObservable<string> = ko.observable("");

        // ****  Init functions

        init = () => {
            this.currentPath = Container.pathObservable;
            this.setupSubscriptions();
        }

        setupSubscriptions = () => {

            // update from data sync
            this.currentPath.subscribeChanged(this.updateViewDataFromPath);

        }

        updateViewDataFromPath = () => {

            var pathInfo = new Models.PathInfo(this.currentPath());
            if (pathInfo.pathType === Models.PathType.Document) {
                Container.directoryService.getDocumentContents(pathInfo).then((contents) => this.documentContent(contents));
            }

        }
    }
}