xquery version "1.0-ml";

module namespace perms = "permissions-lib";


declare function perms:can-save-docs() {
	(: Customize this as needed. :)
	fn:true()
};

declare function perms:can-access-db($db as xs:string) as xs:boolean {
	(: Customize this as needed. :)
	fn:true()
};

declare function perms:check-db-access($db as xs:string) {
	if (perms:can-access-db($db))
	then ()
	else fn:error(xs:QName('DB-ACCESS-ERROR'), "User does not have access to specified database")
};

declare function perms:check-can-save-docs() {
	if (perms:can-save-docs())
	then ()
	else fn:error(xs:QName('SAVE-PERMISSIONS-ERROR'), "User does not have permissions to save documents")
};