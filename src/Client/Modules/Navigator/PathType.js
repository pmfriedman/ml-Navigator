/// <reference path="../references.ts" />
var Navigator;
(function (Navigator) {
    (function (PathType) {
        PathType[PathType["Database"] = 0] = "Database";
        PathType[PathType["Directory"] = 1] = "Directory";
        PathType[PathType["Document"] = 2] = "Document";
        PathType[PathType["Root"] = 3] = "Root";
    })(Navigator.PathType || (Navigator.PathType = {}));
    var PathType = Navigator.PathType;
})(Navigator || (Navigator = {}));
//# sourceMappingURL=PathType.js.map
