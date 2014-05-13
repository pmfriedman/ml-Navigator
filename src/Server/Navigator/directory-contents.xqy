xquery version "1.0-ml";
import module namespace json="http://marklogic.com/xdmp/json"
 at "/MarkLogic/json/json.xqy";
import module namespace perms = "permissions-lib" at "../Security/permissions-lib.xqy";

declare variable $db := xs:string(xdmp:get-request-field("db"));
declare variable $start := xs:integer(xdmp:get-request-field("start", "1"));
declare variable $end := xs:integer(xdmp:get-request-field("end", "1000"));
declare variable $urimatch := xdmp:get-request-field("urimatch", "/");

let $_ := perms:check-db-access($db)
		
let $module-location := "directory-contents-module.xqy"

let $options :=
		<options xmlns="xdmp:eval">
			<database>{xdmp:database($db)}</database>
		</options>

let $data := xdmp:invoke(
	$module-location, 
	(
		xs:QName("start"), $start, 
		xs:QName("end"), $end, 
		xs:QName("urimatch"), $urimatch
	), 
	$options)
return (
	xdmp:set-response-content-type("application/json"),
	xdmp:to-json($data)
	)