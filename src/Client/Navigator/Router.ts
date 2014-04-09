/// <reference path="references.ts" />

class Router {


    // **** data sync to messaging
    currentPath : KnockoutObservable<string>;// = ko.observable("").syncWith(ViewModels.SubscriptionTopic.Path.toString());

    init = () => {

        this.currentPath = Container.pathObservable;
        this.currentPath.subscribeChanged(this.updateHashFromPath);

        Sammy((context) => {
            context.get('.*', (c) => {
                Sammy.log("Caught by Sammy");
                this.updatePathFromHash();
            });
        }).run('#/');
    }

    navigate = (pathInfo: Models.PathInfo) => {
        this.currentPath(pathInfo.path);
    };

    private updateHashFromPath = () => {
        var newHash =  "#/" + this.currentPath();
            Sammy.log("Updating Hash from Path: " + this.currentPath());
            window.location.hash = newHash;
    }

    private updatePathFromHash = () => {
        Sammy.log("Updating Path from Hash: " + window.location.hash.substr(2, window.location.hash.length - 1));
        this.currentPath(window.location.hash.substr(2, window.location.hash.length - 1));
    }

}
