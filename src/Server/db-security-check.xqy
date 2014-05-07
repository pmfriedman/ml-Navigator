xquery version "1.0-ml";

module namespace sec = "db-security";

declare function sec:can-access-db($db as xs:string) as xs:boolean {
	fn:true()
};

declare function sec:check-db-access($db as xs:string) {

	(: Customize this as needed. :)
	if (sec:can-access-db($db))
	then ()
	else fn:error(xs:QName('DB-ACCESS-ERROR'), "User does not have access to specified database")
};