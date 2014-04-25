xquery version "1.0-ml";
module namespace directory = "directory.navigator";


declare function directory:getSubdirectories($db as xs:string, $start as xs:integer, $end as xs:integer, $urimatch as xs:string)
{
	let $options :=
		<options xmlns="xdmp:eval">
			<database>{xdmp:database($db)}</database>
		</options>
	return xdmp:eval('	
	import module namespace functx = "http://www.functx.com" at
		"/MarkLogic/functx/functx-1.0-nodoc-2007-01.xqy";
	declare variable $start as xs:integer external;
	declare variable $end as xs:integer external;
	declare variable $urimatch as xs:string external;
	let $subdirs :=
		fn:distinct-values( 
			for $d in cts:uris("","any"  )
			where (fn:starts-with($d, $urimatch))
			return 
				let $after := fn:substring-after($d, $urimatch)
				let $before := functx:substring-before-if-contains($after, "/")
				return
					if (fn:contains($after, "/"))
					then ($before || "/")
					else $before
			
			)[ $start to $end ]
	return
		for $dir in $subdirs
		let $path := fn:concat($urimatch, $dir)
		let $collections :=
			for $collection in xdmp:document-get-collections($path)
			return <collections>{$collection}</collections>
		return <contents><path>{$path}</path>{$collections}</contents>
	',
	((xs:QName("start"), $start), 
	(xs:QName("end"), $end), 
	(xs:QName("urimatch"), $urimatch)), 
	$options)
};