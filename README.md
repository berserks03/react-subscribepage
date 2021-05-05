# Project

Project consists of two parts - server-side and client-side. Each part should be run separately.

## Client-side

cd client

### Install modules

npm install

### Start  application

npm start

View [http://localhost:8083](http://localhost:8083)

## Server-side

MySQL server has been set up locally using NodeJS. For testing setup your server with database matching project's configuration. Database name 'providerdb'.
``CREATE TABLE `providers` (`id` INTEGER NOT NULL auto_increment , `provider` VARCHAR(255), `email` VARCHAR(255), `selected` TINYINT(1), `date` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;``

cd server

### Install modules

npm install

### Start  application

npm start

Servers run on ports 8082 and 8085
