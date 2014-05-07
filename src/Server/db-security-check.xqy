xquery version "1.0-ml";

module namespace sec = "db-security";

declare function sec:check-db-access($db as xs:string) {

	(: Customize this as needed. :)
	if (fn:true())
	then ()
	else fn:error(xs:QName('DB-ACCESS-ERROR'), "User does not have access to specified database")
};