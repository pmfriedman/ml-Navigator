xquery version "1.0-ml";

module namespace database = "database.navigator";


import module namespace admin = "http://marklogic.com/xdmp/admin" 
    at "/MarkLogic/admin.xqy";

declare function database:getAllDatabases() as xs:string*
{
	let $config := admin:get-configuration()
	let $ids := admin:get-database-ids($config)
	return
		for $id in $ids
		return admin:database-get-name($config, $id)
};
