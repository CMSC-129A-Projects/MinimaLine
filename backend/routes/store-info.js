var express = require('express');
var app = express();
var database = require('../config/database');
const {check, validationResult} = require('express-validator');
var Auth = require('../jwt-auth.js');
const upload = require('../multer')
const cloudinary = require('../cloudinary')
const fs = require('fs');
// const { url } = require('inspector');


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

app.post('/store-registration/:id',upload.single('logo'), async (req,res) => {
    
    const store_name = req.body.store_name;
    const manager_name= req.body.manager_name;
    const location= req.body.location;
    const id = req.params.id

    if(req.file){
        
        const uploader = async(path) => await cloudinary.uploads(path,'Image')    
        const file = req.file
        const {path} = file
        const newPath = await uploader(path)
        const url = newPath
        console.log(url)
        //fs.unlinkSync(path)
        
        if(req.file.mimetype == "image/jpeg" ||req.file.mimetype == "image/png"|| req.file.mimetype == "image/gif" || req.file.mimetype == "image/svg" || req.file.mimetype == "image/jpg"){
            // database.query("INSERT INTO store_info(store_name, manager_name, location, logo) VALUES (?,?,?,?)", [store_name, manager_name, location, url.url],
            database.query("UPDATE account_info SET store_name=?, manager_name=?, location=?, logo=? WHERE id = ? ", [store_name, manager_name, location, url.url, id],
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
        // database.query("INSERT INTO store_info(store_name, manager_name, location) VALUES (?,?,?)", [store_name, manager_name, location],
        database.query("UPDATE account_info SET store_name=?, manager_name=?, location=? WHERE id = ? ", [store_name, manager_name, location, id],
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
app.post('/edit-storename', Auth.checkAccessToken, (req, res) => {
    let id = req.userId;
    let storename = req.body.storename;

    console.log(id)
    database.query("UPDATE account_info SET store_name=? WHERE id = ? ", [storename,id],
        (err,result) => {
            if(result){
                console.log("hello")
                console.log(result)
                res.send(result)
            }
            else{
                console.log(err)
                res.send(err)
            }
        }
    )
});
app.post('/edit-manager', Auth.checkAccessToken, (req, res) => {
    let id = req.userId;
    let manager = req.body.manager;

    console.log(id)
    database.query("UPDATE account_info SET manager_name=? WHERE id = ? ", [manager,id],
        (err,result) => {
            if(result){
                console.log("hello")
                console.log(result)
                res.send(result)
            }
            else{
                console.log(err)
                res.send(err)
            }
        }
    )
});
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
// //to register store into account_info table
// app.post('/store-registration/:id',upload.single('logo'), async (req,res) => {
    
//     const store_name = req.body.store_name;
//     const manager_name= req.body.manager_name;
//     const location= req.body.location;
//     const id = req.params.id
  
//     if (!req.file){
//         database.query("UPDATE account_info SET store_name=?, manager_name=?, location=? WHERE id = ? ", [store_name, manager_name, location, id],
//             (err, result) => {
//                 if(result){
//                     // console.log(result.data)
//                     return res.status(200).send(result);
//                 }
//                 else
//                     return res.status(400).send({message: "Error"})
//                 });
//     }
//     else{
//         console.log("hello")
//         var file = req.file;
//         var img_name = file.name;
//         console.log("file uploaded:")
//         console.log(file)
//         //console.log(store_name, manager_name, location,logo)

//         if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"|| file.mimetype == "image/gif" || file.mimetype == "image/svg" || file.mimetype == "image/jpg"){
//                 if (err) {
//                     res.status(500).send(err);
//                     return 
//                 }
//                  database.query("UPDATE account_info SET store_name=?, manager_name=?, location=?, logo=? WHERE id = ? ", [store_name, manager_name, location, file, id],
//                     (err, result) => {
//                         if(!err)
//                             return res.status(200).send(result)
//                         else
//                             return res.status(400).send({message: "Error"})
//                     });
//             } 
//                 else {
//                     console.log("This format is not allowed , please upload file with '.png','.gif','.jpg'");
//                 }
//             }

//     // else{
//     //     database.query("INSERT INTO store_info(store_name, manager_name, location) VALUES (?,?,?)", [store_name, manager_name, location],
//     //     //database.query("UPDATE account_info SET store_name=?, manager_name=?, location=? WHERE id = ? ", [store_name, manager_name, location, id],
//     //             (err, result) => {
//     //                 if(!err){
//     //                     res.status(200).send(result);
//     //                     return
//     //                 } 
//     //                 else
//     //                     console.log(err)
//     //                     return
//     //                 });
//     //             }
// });

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