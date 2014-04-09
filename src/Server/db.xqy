xquery version "1.0-ml";
import module namespace functx = "http://www.functx.com" at "/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
import module namespace database = "database.navigator" at "/Server/lib/database.xqy";

let $dbs := database:getAllDatabases()
return xdmp:to-json(json:to-array($dbs))