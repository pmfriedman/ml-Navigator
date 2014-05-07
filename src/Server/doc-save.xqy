xquery version "1.0-ml";
import module namespace json = "http://marklogic.com/json" at "/MarkLogic/appservices/utils/json.xqy";
import module namespace json1="http://marklogic.com/xdmp/json" at "/MarkLogic/json/json.xqy";
import module namespace sec = "db-security" at "db-security-check.xqy";

declare namespace json2="http://marklogic.com/xdmp/json/basic";



declare variable $db := xs:string(xdmp:get-request-field("db"));
declare variable $data-json := xs:string(xdmp:get-request-field("path"));

let $_ := sec:check-db-access($db)
		
let $module-location := "doc-save-module.xqy"

let $options :=
		<options xmlns="xdmp:eval">
			<database>{xdmp:database($db)}</database>
		</options>

let $data1 := xdmp:get-request-body()
let $data := json1:transform-from-json($data1)
let $data2 := xdmp:quote($data)
let $path := $data/node()[1]/text()
let $content := 
	try {
		xdmp:unquote($data//json2:content/node()) }
	catch ($e) {
		$data//json2:content/node()
	}

let $_ := xdmp:log($content)

let $vals := xdmp:invoke($module-location, (
		(xs:QName("path"), $path), 
		(xs:QName("content"), $content)
	), $options)
return json:serialize(<result>{$vals}</result>)