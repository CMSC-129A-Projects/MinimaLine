const express = require("express");
const mysql = require('mysql');
const app = express();

app.use(express.json());

//connect to database
const con = mysql.createPool({
    //port: 3005,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bea725712d6b40',
    password: '3be5d085',
    database: 'heroku_ab8a7682cf2e0f2'
});
// const con = mysql.createConnection({
//     //port: 3005,
//     host: 'us-cdbr-east-04.cleardb.com',
//     user: 'bea725712d6b40',
//     password: '3be5d085',
//     database: 'heroku_ab8a7682cf2e0f2'
// });

module.exports = con;
// mysql://bea725712d6b40:3be5d085@us-cdbr-east-04.cleardb.com/heroku_ab8a7682cf2e0f2?reconnect=true