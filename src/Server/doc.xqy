xquery version "1.0-ml";
import module namespace functx = "http://www.functx.com" at "/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
import module namespace document = "document.navigator" at "/Server/lib/document.xqy";
import module namespace perms = "permissions-lib" at "Security/permissions-lib.xqy";

declare variable $database := xs:string(xdmp:get-request-field("db"));
declare variable $uri := xdmp:get-request-field("uri", "/");

let $_ := perms:check-db-access($database)

return xdmp:to-json(xdmp:quote(document:getDocumentContent($database, $uri)))