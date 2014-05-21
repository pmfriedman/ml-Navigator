xquery version "1.0-ml";
import module namespace functx = "http://www.functx.com" at "/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
import module namespace perms = "permissions-lib" at "../Security/permissions-lib.xqy";
import module namespace admin = "http://marklogic.com/xdmp/admin" at "/MarkLogic/admin.xqy";

let $dbs := 
	let $config := admin:get-configuration()
	let $ids := admin:get-database-ids($config)
	return
		for $id in $ids
		return admin:database-get-name($config, $id)
let $dbs := 
	for $db in $dbs
	where perms:can-access-db($db)
	return $db
return xdmp:to-json(json:to-array($dbs))