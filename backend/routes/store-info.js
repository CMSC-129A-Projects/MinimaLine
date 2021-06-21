var express = require('express');
var app = express();
var database = require('../config/database');
const {check, validationResult} = require('express-validator');
var Auth = require('../jwt-auth.js');
const fs = require('fs');
var s3 = require('../s3.js');

app.get('/request-upload', async (req,res) => {
    const url = await s3.getUploadURL();
    console.log(url)
    return res.send({url})
})

app.post('/store-registration/:id', (req,res) => {
    const {store_name,manager_name,location,logo} = req.body;
    const id = req.params.id;

    database.query("UPDATE account_info SET store_name=?, manager_name=?, location=?, logo=? WHERE id = ? ", [store_name, manager_name, location, logo, id],
        (err, result) => {
            if(err)
                return res.send("Error")
            else
                return res.send(result);
        })
})

app.post('/edit-storename', Auth.checkAccessToken, (req, res) => {
    let id = req.userId;
    let storename = req.body.storename;

    console.log(id)
    database.query("UPDATE account_info SET store_name=? WHERE id = ? ", [storename,id],
        (err,result) => {
            if(result){
                console.log(result)
                res.send(result)
            }
            else{
                console.log(err)
                res.send(err)
            }
        }
    )
})

app.post('/edit-manager', Auth.checkAccessToken, (req, res) => {
    let id = req.userId;
    let manager = req.body.manager;

    console.log(id)
    database.query("UPDATE account_info SET manager_name=? WHERE id = ? ", [manager,id],
        (err,result) => {
            if(result){
                console.log(result)
                res.send(result)
            }
            else{
                console.log(err)
                res.send(err)
            }
        }
    )
})

app.post('/edit-location', Auth.checkAccessToken, (req, res) => {
    let id = req.userId;
    let location = req.body.location;

    console.log(id)
    database.query("UPDATE account_info SET location=? WHERE id = ? ", [location,id],
        (err,result) => {
            if(result){
                console.log(result)
                res.send(result)
            }
            else{
                console.log(err)
                res.send(err)
            }
        }
    )
})

app.post('/edit-logo', Auth.checkAccessToken, (req, res) => {
    let id = req.userId;
    let logo = req.body.logo;

    console.log(id)
    database.query("UPDATE account_info SET logo=? WHERE id = ? ", [logo,id],
        (err,result) => {
            if(result){
                console.log(result)
                res.send(result)
            }
            else{
                console.log(err)
                res.send(err)
            }
        }
    )
})

app.post('/check-store', (req,res)=> {
    let id = req.body.id
    let role = "manager"
    database.query("SELECT * FROM account_info WHERE id = ? AND role = ?", [id,role], 
        (err, result) => {
            if(err){
                return err;
            }
            else{
                if(result.length > 0){
                    console.log(result)
                    return res.send(result);
                }
                else
                    return res.send({message: "Does not exist!!!!!"})
            }
            
    });
});

module.exports = app;