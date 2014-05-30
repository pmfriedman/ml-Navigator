#ml-Navigator

##Introduction
The Navigator exposes ML databases as an easily navigable file-system.

The Navigator also can be used as an extensible platform for custom tools.

##User Guide
###Accessing

To access the Navigator, navigate to [AppServerURL]/[NavigatorRoot]/Client/default.html.

###The Documents Tab

Allows you to navigate through the selected database as if moving through a file system explorer.

To Navigate: Select a database.  Select the links under Breadcrumbs or Contents to move up and down the directory tree.

To view documents: Select the link under Contents or Select from the search box.

To update documents (will not be available if you don’t have permissions): Select the document, modify in the code editor, Click save, and then confirm

To URI search: Select a database, then type into the search box.


##Developer Guide

###Architecture

The Navigator is a Single Page App implemented with Google’s AngularJS framework.  It makes AJAX calls to server-side xquery modules to retrieve json-formatted data as necessary.

Each tool/feature is implemented as an Angular module with a corresponding set of xquery modules.

###About AngularJS

Angular has a bit of a learning curve and relatively sparse documentation, but using the existing code as a model and googling as needed, maintaining and extending the Navigator is possible without becoming an Angular expert.

###Deployment

Simply copy all the files to a filesystem-based app server.

###Security

####Required Permissions

All the modules are “xdmp:invoke”d from the app server, so the user will need that permission to run anything. 

In addition, admin-module-read is necessary for the Navigator module to list all the databases.

####Server-side Protection

There is an xquery library with permissions functions under Server/Security/permissions-lib.xqy.
Every entry point should call perms:can-access-db($db) before invoking its own library module.  Additional checks can also be added to the same permissions-lib library and called as needed.

####Client-side Protection

You can create custom permissions for the Navigator that can then be used to modify the user’s view.  Call Server/Security/permissions.xqy to retrieve the current user’s custom permissions.  This must be extended every time a new permission is added.



###Supported Browsers, Dev Tools & Debugging Tips

The Navigator has only been tested on Chrome.  Non-HTML5 compliant browsers should not be expected to work.

Chrome’s F12 debugging tools are very helpful.

The Navigator currently does not show failure messages.  Chrome’s F12 Network tab is very helpful for this.

DHC chrome extension is helpful for debugging server scripts.

###What’s Missing

- Collection browsing
- Paging in Navigator
- Failure messages
- Busy indicators
- Ability to script document changes
- Diff changes before saving

