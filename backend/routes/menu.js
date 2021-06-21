var express = require('express');
var app = express();
var database = require('../config/database');
const {check, validationResult} = require('express-validator');
var Auth = require('../jwt-auth.js');

//Add categories to edit menu
app.post('/add-categ', Auth.checkAccessToken, (req,res)=> {
    let id = req.userId;
    let category = req.body.category
    console.log(`store id: ${id}, category: ${category}`)
    
    database.query("INSERT INTO category (name,store_id) VALUES (?,?)", [category, id],
    (err, result) => {
        if(!err)
            // console.log(result)
            res.send(result)
        else
            console.log(err)
        }
    )
});

//Delete categories 
app.delete('/delete-categ/:id', Auth.checkAccessToken, (req,res)=> {
    let store_id = req.userId;
    let categ_id = req.params.id
    
    database.query("DELETE FROM category WHERE id = ? AND store_id = ?", [categ_id,store_id],
    (err, result) => {
        if(!err)
            console.log(result)
            res.status(200).send(result)
        }
    )
    
});

// Edit category name
app.post('/edit-categ/:id', Auth.checkAccessToken,(req, res) => {
    let prod_id= req.params.id;
    let store_id = req.userId;
    let name = req.body.name

    database.query("UPDATE category SET name = ? WHERE id = ? AND store_id = ?", [name,prod_id,store_id],
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

//send category list 
app.get('/display-category', Auth.checkAccessToken, (req,res) => {
    let id = req.userId;

    database.query('SELECT * FROM category WHERE store_id = ?', id, (err, result) => {
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
//send category list 
app.get('/display-category/:id',(req,res) => {
    let id = req.params.id;

    database.query('SELECT * FROM category WHERE store_id = ?', id, (err, result) => {
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
app.get('/menu-info/:id', Auth.checkAccessToken, (req,res) => {
    let categ_id = req.params.id
    let store_id = req.userId;
    database.query("SELECT * FROM menu_info WHERE category_id = ? AND store_id = ? ", [categ_id,store_id],
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
//get products by category ID
app.get('/menu-info/:store_id/:categ_id', (req,res) => {
    let categ_id = req.params.categ_id
    let store_id = req.params.store_id;
    database.query("SELECT * FROM menu_info WHERE category_id = ? AND store_id = ? ", [categ_id,store_id],
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
app.post('/add-product', Auth.checkAccessToken, (req,res)=> {
    // if(req.method == "POST"){
        let store_id = req.userId;
        let post  = req.body;
        let product= post.product;
        let price= post.price;
        let availability= post.availability;
        let category = post.category;
        let photo=post.photo;
        console.log(product, price, availability, category,photo)
        // if (!req.files){
            database.query("INSERT INTO menu_info (product,price,category_id,availability,photo,store_id) VALUES (?,?,?,?,?,?)", [product,price,category,availability,photo,store_id],
                (err, result) => {
                    if(!err)
                        return res.status(200).send(result);
                    else
                        console.log(err)
                });
});

//Delete products
app.delete('/delete-product/:id', Auth.checkAccessToken,(req,res)=> {
    let store_id = req.userId;
    let prod_id = req.params.id
    
    database.query("DELETE FROM menu_info WHERE id = ? AND store_id = ?", [prod_id,store_id],
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

app.post('/edit-menu/:id', Auth.checkAccessToken,(req, res) => {
    let prod_id= req.params.id;
    let product= req.body.product;
    let price= req.body.price;
    let availability= req.body.availability;
    let category = req.body.category;
    let store_id = req.userId;

    database.query("UPDATE menu_info SET product=?, price=?, category_id=?, availability=? WHERE id = ? AND store_id = ?", [product, price, category, availability,prod_id,store_id],
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