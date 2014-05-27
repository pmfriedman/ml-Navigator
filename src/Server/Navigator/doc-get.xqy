xquery version "1.0-ml";
import module namespace json="http://marklogic.com/xdmp/json"
 at "/MarkLogic/json/json.xqy";
import module namespace perms = "permissions-lib" at "../Security/permissions-lib.xqy";

declare variable $db := xs:string(xdmp:get-request-field("db"));
declare variable $uri := xdmp:get-request-field("uri", "/");

let $_ := perms:check-db-access($db)
		
let $module-location := "doc-get-module.xqy"

let $options :=
		<options xmlns="xdmp:eval">
			<database>{xdmp:database($db)}</database>
		</options>

let $data := xdmp:invoke(
	$module-location, 
	(
		xs:QName("uri"), $uri
	), 
	$options)
return (
	xdmp:set-response-content-type("application/json"),
	xdmp:to-json($data)
	)