xquery version "1.0-ml";
module namespace document = "document.navigator";

declare function document:getDocumentContent($db, $uri)
{
	let $options :=
		<options xmlns="xdmp:eval">
			<database>{xdmp:database($db)}</database>
		</options>
	return xdmp:eval('
	
		declare variable $uri as xs:string external;
		fn:doc($uri)
		', 
		((xs:QName("uri"), $uri)),
		$options)
};