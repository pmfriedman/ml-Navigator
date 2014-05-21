xquery version "1.0-ml";

declare variable $pattern as xs:string external;

let $search := 
	cts:uri-match('*' || $pattern || '*', ("limit=30"))    
return 
    json:to-array($search)
    