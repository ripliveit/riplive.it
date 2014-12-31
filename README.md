## Riplive.it Front end application
The Riplive.it front end application.  
It consists in a NodeJS front end API + static server + an AngularJS application used to 
show all riplive.it contents to the user. 
Run on port 8080. 
Proxied by an Nginx instance.  

## Installation and run
Clone the repository, than install all application's dependencies:

    $ npm install --production

Launch all unit tests with:

	$ mocha -R spec test/spec/server

Run the application:

	$ node app.js

##  Continuous integration and Deployment

All builds, tests and deployment are running against a Jenkins server available at

build.riplive.it:8080
