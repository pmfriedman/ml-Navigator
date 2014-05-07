xquery version "1.0-ml";
import module namespace functx = "http://www.functx.com" at "/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
import module namespace database = "database.navigator" at "/Server/lib/database.xqy";
import module namespace sec = "db-security" at "db-security-check.xqy";

let $dbs := database:getAllDatabases()
let $dbs := 
	for $db in $dbs
	where sec:can-access-db($db)
	return $db
return xdmp:to-json(json:to-array($dbs))