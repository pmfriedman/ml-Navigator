xquery version "1.0-ml";

declare variable $uri as xs:string external;
		
xdmp:quote(fn:doc($uri))