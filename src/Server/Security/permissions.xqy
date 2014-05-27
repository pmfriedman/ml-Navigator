xquery version "1.0-ml";

import module namespace perms = "permissions-lib" at "permissions-lib.xqy";

let $map := json:object()

let $_ := map:put($map, "canSaveDocuments", perms:can-save-docs())

return xdmp:to-json($map)