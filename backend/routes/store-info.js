var express = require('express');
var app = express();
var database = require('../config/database');
const {check, validationResult} = require('express-validator');
const multer = require('multer');
var Auth = require('../jwt-auth.js');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage: storage});

app.post('/single', [
    check('store_name')
    .notEmpty()
    .withMessage('Store name cannot be empty'),
    check('manager_name')
    .notEmpty()
    .withMessage('Manager name cannot be empty'),
    check('location')
    .notEmpty()
    .withMessage('Location cannot be empty')
    ] ,upload.single('logo'),(req,res) => {
    
    const store_name = req.body.store_name;
    const manager_name = req.body.manager_name;
    const location = req.body.location;


    if(!req.file){
        console.log(store_name,manager_name,location)
        res.send('No files uploaded')
    }
    
    else{
        console.log(store_name,manager_name,location,req.file)
        res.send('Files uploaded')
        }
});


// //get data from store-info table
// app.get('/store-info', Auth.checkAccessToken, (req,res) => {
//     let id = req.userId;

//     // let sql = 'SELECT * FROM store_info where id =';

//     database.query('SELECT * FROM category where store_id=?', (err, result) => {
//         if (err) {
//             res.status(400).send(err);
//             return;
//         }

//         if (result.length) {
//             res.json(result);
//         }
//         else res.json({});
//     });
// });

//to register store into account_info table
app.post('/store-registration/:id', [
    check('store_name')
    .notEmpty()
    .withMessage('Store name cannot be empty'),
    check('manager_name')
    .notEmpty()
    .withMessage('Manager name cannot be empty'),
    check('location')
    .notEmpty()
    .withMessage('Location cannot be empty')
    ] , upload.single('logo'),(req,res)=> {
    
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const store_name = req.body.store_name;
    const manager_name= req.body.manager_name;
    const location= req.body.location;
    const id = req.params.id
  
    if (!req.file){
        database.query("UPDATE account_info SET store_name=?, manager_name=?, location=? WHERE id = ? ", [store_name, manager_name, location, id],
            (err, result) => {
                if(result){
                    // console.log(result.data)
                    return res.status(200).send(result);
                }
                else
                    return res.status(400).send({message: "Error"})
                });
        }
    
    else{
        console.log("hello")
        var file = req.file;
        var img_name = file.name;
        console.log("file uploaded:")
        console.log(file)
        //console.log(store_name, manager_name, location,logo)

        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"|| file.mimetype == "image/gif" || file.mimetype == "image/svg" || file.mimetype == "image/jpg"){
                if (err) {
                    res.status(500).send(err);
                    return 
                }
                 database.query("UPDATE account_info SET store_name=?, manager_name=?, location=?, logo=? WHERE id = ? ", [store_name, manager_name, location, file, id],
                    (err, result) => {
                        if(!err)
                            return res.status(200).send(result)
                        else
                            return res.status(400).send({message: "Error"})
                    });
            } 
                else {
                    console.log("This format is not allowed , please upload file with '.png','.gif','.jpg'");
                }
    }
});

module.exports = app;