xquery version "1.0-ml";
import module namespace json="http://marklogic.com/xdmp/json"
 at "/MarkLogic/json/json.xqy";
import module namespace sec = "db-security" at "db-security-check.xqy";

declare variable $db := xs:string(xdmp:get-request-field("db"));
declare variable $pattern := xs:string(xdmp:get-request-field("pattern"));

let $_ := sec:check-db-access($db)
		
let $module-location := "search-module.xqy"

let $options :=
		<options xmlns="xdmp:eval">
			<database>{xdmp:database($db)}</database>
		</options>

let $data := xdmp:invoke($module-location, (xs:QName("pattern"), $pattern), $options)
return (
	xdmp:set-response-content-type("application/json"),
	xdmp:to-json($data)
	)