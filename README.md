Payfirma Coding Exercise
========================

This project implements a simple laptop shop with a customization step.


Technology used
---------------

* Spring Boot
* Spring MVC
* Spring Security
* ReactJS


Configuration
-------------

Copy `src/main/webapp/javascript/config.js.dist` to `src/main/webapp/javascript/config.js`and fill in the details.


Starting
--------

Just run the `bootRun` gradle task.

This will automatic execute the following tasks:

* Download NodeJS
* Install npm dependencies
* Builds the application
* Builds the React client
* Runs the server on http://localhost:8080 (You can open that in the browser)


Things that are integrated
--------------------------

* Spin off a in-memory database
* Sign Up API Endpoint
* Laptops API Endpoint
* Basic authentication support
* Sign-Up UI
* Sign-In UI
* Laptop Overview UI
* Configuration Builder UI
* Credit Card Details Collection UI


Default Data
------------

By default there is a user with username `test` and password `test` and three Laptops with configuration created.
If you want to change the default data look for the `BootstrapDataPopulator` class.


Things that are missing
-----------------------

* Proper converter for representation
* Extended exception mapper
* Different API authentication (e.g. JWT)
* Caching support
* Paginating support
* More functionality
* Splitting off UI code from server code
* Adding testing (unit and integration)
* Added propType validation to React components
* Better code structure within React part
* Proper documentation


Things that can not be completed
--------------------------------

I was trying to implement the Payfirma code into the application to collect payment details. Unfortunately the 
Javascript library is not build to be used with a single page application. So I can not complete the integration
at this time.


Basic code structure
--------------------

* `src/main/java` Contains the REST server
* `src/main/webapp/javascript` Contains the React client
