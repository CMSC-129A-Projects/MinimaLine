const express = require("express");
const mysql = require('mysql');
const app = express();

app.use(express.json());

//connect to database
const con = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bb894ec6e6df31',
    password: 'c7693661',
    database: 'heroku_265d1c24262a4ec'
});

module.exports = con;