/// <reference path="references.ts" />
$(document).ready(function () {
    initContainer();

    var explorerVM = new ViewModels.ExplorerViewModel();
    explorerVM.init().then(Container.router.init);
    window.evm = explorerVM;
    ko.applyBindings(explorerVM, document.getElementById('divExplorer'));

    var editorVM = new ViewModels.EditorViewModel();
    editorVM.init();
    window.editorVM = editorVM;
    ko.applyBindings(editorVM, document.getElementById('divEditor'));
});

function initContainer() {
    Container.pathObservable = ko.observable('^').extend({ lockable: true });
    Container.directoryService = new MarkLogic.DirectoryService();
    Container.databaseService = new MarkLogic.DatabaseService();
    Container.server = new Server();
    Container.router = new Router();
}
//# sourceMappingURL=Default.js.map
