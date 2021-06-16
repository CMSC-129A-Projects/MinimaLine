var express = require('express');
var app = express();
var database = require('../config/database');
const {check, validationResult} = require('express-validator');
const multer = require('multer');
const upload = require('../multer')
const cloudinary = require('../cloudinary')
const fs = require('fs');
const { url } = require('inspector');

app.post('/single',upload.single('image'),async (req,res) => {
    
    const uploader = async(path) => await cloudinary.uploads(path,'Image')

    if (req.method === 'POST'){
        const url = []
        const file = req.file
        const {path} = file
        const newPath = await uploader(path)
        url.push(newPath)
        fs.unlinkSync(path)

        res.status(200).json({
            message:'Image upload successful',
            data:url
        })
    
    }else{
        res.status(405).json({
            err:"Image not uploaded successfully"
        })
    }
});


//get data from store-info table
app.get('/store-info', (req,res) => {
    let sql = 'SELECT * FROM store_info';

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length) {
            res.json(result);
        }
        else res.json({});
    });
});

//to register store into account_info table
app.post('/store-registration/:id',upload.single('logo'), async (req,res) => {
    
    const store_name = req.body.store_name;
    const manager_name= req.body.manager_name;
    const location= req.body.location;
    //const id = req.params.id

    if(req.file){
        
        const uploader = async(path) => await cloudinary.uploads(path,'Image')    
        const file = req.file
        const {path} = file
        const newPath = await uploader(path)
        const url = newPath
        console.log(url)
        fs.unlinkSync(path)
        
        if(req.file.mimetype == "image/jpeg" ||req.file.mimetype == "image/png"|| req.file.mimetype == "image/gif" || req.file.mimetype == "image/svg" || req.file.mimetype == "image/jpg"){
            database.query("INSERT INTO store_info(store_name, manager_name, location, logo) VALUES (?,?,?,?)", [store_name, manager_name, location, url.url],
            //database.query("UPDATE account_info SET store_name=?, manager_name=?, location=?, logo=? WHERE id = ? ", [store_name, manager_name, location, img_name, id],
                (err, result) => {
                    if(!err)
                        return res.status(200).send(result)
                    else
                        return res.status(400).send("error")
                    });
            } 
                else {
                    console.log("This format is not allowed , please upload file with '.png','.gif','.jpg'");
                }
            }

    else{
        database.query("INSERT INTO store_info(store_name, manager_name, location) VALUES (?,?,?)", [store_name, manager_name, location],
        //database.query("UPDATE account_info SET store_name=?, manager_name=?, location=? WHERE id = ? ", [store_name, manager_name, location, id],
                (err, result) => {
                    if(!err){
                        res.status(200).send(result);
                        return
                    } 
                    else
                        console.log(err)
                        return
                    });
                }
});

//get logo of store
app.get('/storeLogo/:id', (req,res) => {
    const id = req.params.id

    database.query("SELECT logo FROM store_info WHERE id = ?", id,
    (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (logo) {
            res.status(200).send(logo);
        }
        else res.status(200).send('No Logo');
    });
});

module.exports = app;