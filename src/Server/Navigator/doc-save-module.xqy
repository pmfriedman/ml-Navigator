xquery version "1.0-ml";

declare variable $path as xs:string external;
declare variable $content external;

let $permissions := xdmp:document-get-permissions($path)
let $collections := xdmp:document-get-collections($path)

return
 (
 	xdmp:document-insert($path, $content, $permissions, $collections),
	$path
)