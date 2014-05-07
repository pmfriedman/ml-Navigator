xquery version "1.0-ml";
import module namespace functx = "http://www.functx.com" at "/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
import module namespace json = "http://marklogic.com/json" at "/MarkLogic/appservices/utils/json.xqy";
import module namespace directory = "directory.navigator" at "/Server/lib/directory.xqy";
import module namespace perms = "permissions-lib" at "Security/permissions-lib.xqy";

declare variable $database := xs:string(xdmp:get-request-field("db"));
declare variable $start := xs:integer(xdmp:get-request-field("start", "1"));
declare variable $end := xs:integer(xdmp:get-request-field("end", "1000"));
declare variable $urimatch := xdmp:get-request-field("urimatch", "/");

let $_ := perms:check-db-access($database)

let $subs := directory:getSubdirectories($database, $start, $end, $urimatch)
(: return xdmp:to-json(json:to-array($subs)) :)
return json:serialize(<result>{$subs}</result>)