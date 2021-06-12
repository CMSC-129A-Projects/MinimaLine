var express = require('express');
var app = express();
var database = require('../config/database');
const {check, validationResult} = require('express-validator');

//Add categories to edit menu
app.post('/add-categ', [
    check('category')
    .notEmpty()
    .withMessage("Category cannot be empty")
    .exists()
    .withMessage("Category exists")
    ], (req,res)=> {
    
    const {category} = req.body
    // console.log(category)
    // console.log(req.body)
    
    database.query("INSERT INTO category (name) VALUES (?)", 
    [category],
    (err, result) => {
        if(!err)
            // console.log(result)
            res.status(201).send(result)
        }
    )
});

//Delete categories 
app.delete('/delete-categ/:id', (req,res)=> {
    
    const id = req.params.id
    console.log(id)
    
    database.query("DELETE FROM category WHERE id = ?", id,
    (err, result) => {
        if(!err)
            console.log(result)
            res.status(200).send(result)
        }
    )
    
});

//send category list to frontend for display to edit menu
app.get('/display-category', (req,res) => {
    let sql = 'SELECT * FROM category';

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (result.length) {
            res.status(200).json(result);
        }
        else res.status(200).json({});
    });
});

//get products by category ID
app.get('/menu-info/:id', (req,res) => {
    // let sql = 'SELECT * FROM menu_info';
    const id = req.params.id

    database.query("SELECT * FROM menu_info WHERE category_id = ?", id,
    (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length) {
            res.status(200).json(result);
        }
        else res.status(200).json({});
    });
});

//to add products to menu (manager side)
app.post('/add-product', (req,res)=> {
    if(req.method == "POST"){
        var post  = req.body;
        var product= post.product;
        var price= post.price;
        var availability= post.availability;
        var category = post.category;
        console.log(product, price, availability, category)
        if (!req.files){
            database.query("INSERT INTO menu_info (product,price,category_id,availability) VALUES ('" + product + "','" + price + "','" + category + "','" + availability + "')",
                (err, result) => {
                    if(!err)
                        return res.status(200).send(result);
                    else
                        console.log(err)
                });
        }
        
        else{
          var file = req.files.photo;
          var img_name = file.name;
          console.log("file uploaded:")
          console.log(file)

             if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"|| file.mimetype == "image/gif" || file.mimetype == "image/svg" || file.mimetype == "image/jpg"){
                                   
                file.mv('public/uploads'+file.name, function(err) {
                               
                    if (err)
                        // console.log(err)
                      return res.status(500).send(err);
                            database.query("INSERT INTO menu_info (product,price,category_id,availability,photo) VALUES ('" + product + "','" + price + "','" + category + "','" + availability + "','" + img_name + "')",
                            (err, result) => {
                                if(!err)
                                    return res.status(200).send(result)
                                else
                                    return res.status(400).send("error")
                            });
                        });
            } else {
                console.log("This format is not allowed , please upload file with '.png','.gif','.jpg'");
            }
        }
    }
});

//Delete products
app.delete('/delete-product/:id', (req,res)=> {
    
    const id = req.params.id
    console.log(id)
    
    database.query("DELETE FROM menu_info WHERE id = ?", id,
    (err, result) => {
        if(!err){
            //console.log(result)
            res.send(result)
        }
        else{
            res.status(400).send({message:"no account to delete"})
        }
    })
});

// app.get('/edit-menu/:id', function(req, res, next) {
//     var id = req.params.id;
//     var sql = `SELECT * FROM menu_info WHERE id= ${id}`;
//     database.query(sql, function (err, data) {
//       if (err) throw err;
//         res.send(result)
//     });
// });

app.post('/edit-menu/:id', (req, res) => {
    var id= req.params.id;
    var post  = req.body;
    var product= post.product;
    var price= post.price;
    var availability= post.availability;
    var category = post.category;

    console.log(id)
    database.query("UPDATE menu_info SET product=?, price=?, category_id=?, availability=? WHERE id = ? ", [product, price, category, availability,id],
        (err,result) => {
            if(result){
                console.log("hello")
                res.send(result)
            }
            else{
                console.log(err)
                res.send(err)
            }
        }
    )
});
        

module.exports = app;