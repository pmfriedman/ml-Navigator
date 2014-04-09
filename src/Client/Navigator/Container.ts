/// <reference path="references.ts" />

class Container {
    static server : Server
    static directoryService : MarkLogic.IDirectoryService
    static databaseService : MarkLogic.DatabaseService
    static router : Router
    static pathObservable : KnockoutObservable<string>
}
