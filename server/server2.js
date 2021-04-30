const express = require('express');
const app = express();
 
const db = require("./app/models");



db.sequelize.sync();


let router = require('./app/routes/excel.routes.js');

app.use('/', router);   

// Create a Server
const server = app.listen(8085,  ()=> {
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})
