xquery version "1.0-ml";

import module namespace functx = "http://www.functx.com" at
		"/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
		
declare variable $start as xs:integer external;
declare variable $end as xs:integer external;
declare variable $urimatch as xs:string external;

declare function local:get-subdirs($base-dir, $discovered-dirs, $iteration) {

  let $new-doc :=
    cts:uri-match($base-dir || "*/*", ("any", "ascending"), 
    cts:and-query((
      cts:not-query(cts:directory-query($discovered-dirs, "infinity"))
    )))[1]
    
  let $has-subdir :=
    $new-doc and fn:starts-with($new-doc, $base-dir)
  return
    if ($has-subdir and ($iteration gt 0))
    then local:get-subdirs($base-dir, ($discovered-dirs, local:get-child-dir($base-dir, $new-doc)), $iteration + 1)
    else ($discovered-dirs)
};

declare function local:get-child-dir($base-dir, $uri) {

  let $after-base-uri := fn:substring-after($uri, $base-dir)
  
  let $protocol := fn:substring-before($after-base-uri, "://")
  let $after-protocol := 
    if ($protocol)
    then fn:substring-after($after-base-uri, "://")
    else $after-base-uri
  let $protocol-if-present :=
    if ($protocol)
    then $protocol || "://"
    else ""
  let $child-dir := functx:substring-before-if-contains($after-protocol, "/")
  return $base-dir || $protocol-if-present || $child-dir || '/'
};

declare function local:get-contents($path) {
  let $base-dir :=
    if (fn:ends-with($path, "/"))
    then $path
    else ()
  let $subdirs := local:get-subdirs($base-dir, (), 1)
  let $docs := 
    if ($base-dir)
    then
      cts:uri-match($base-dir || "*", ("any", "ascending"), 
        cts:directory-query($base-dir, "1"))[1 to 200]
    else 
      cts:uri-match($base-dir || "*", ("any", "ascending"), 
        cts:not-query(cts:directory-query($subdirs, "infinity")))
  return 
  	let $wrapped-dirs :=
  		for $subdir in $subdirs
  		return local:wrap-directory($subdir)
	let $wrapped-docs :=
		for $doc in $docs
		return local:wrap-document($doc)
  	return
  		json:to-array(($wrapped-dirs, $wrapped-docs))
};

declare function local:wrap-directory($path) {

	let $map := json:object()
	let $_ := map:put($map, "uri", $path)

	return $map
};

declare function local:wrap-document($path) {
	let $collections :=	xdmp:document-get-collections($path)
	let $collections-array := json:to-array($collections)

	let $map := json:object()
	let $_ := map:put($map, "uri", $path)
	let $_ := map:put($map, "collections", $collections-array)

	return $map

};

local:get-contents($urimatch)