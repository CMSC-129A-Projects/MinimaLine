var express = require('express');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const saltRounds = 10;
const {check, validationResult} = require('express-validator');
var app = express();
var database = require('../config/database');

app.use(express.json());
app.use(cookieParser());

app.use(session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60
    }
}))

//get data from account-info table 
app.get('/account-info/:id', (req,res) => {
    const id = req.params.id

    database.query("SELECT username FROM account_info WHERE id = ?", id,
    (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length) {
            res.status(200).send(result);
        }
        else res.status(200).json({});
    });
});

//to register user info in account_info table 
app.post('/user-registration', [
    check('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({min: 4}) 
    .withMessage('Username should be at least 4 characters long')
    .isLength({max: 20})
    .withMessage('Username cannot be more than 20 characters long')
    .exists()
    .withMessage('Username exists'),
    check('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email should be valid')
    .exists()
    .withMessage('Email exists'),
    check('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 4, max: 20})
    .withMessage('Password should be between 4 - 20 characters'),
    ], (req,res)=> {

    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    var role = "manager"
    const {username,email,password}=req.body
    
    bcrypt.hash(password,saltRounds, (err, hash) => {
        database.query(
            "INSERT INTO account_info (username, email, password,role) VALUES (?,?,?,?)", 
            [username, email, hash, role], 
            (err, result) => {
                if(err){
                    console.log(err)
                    res.status(400)
                     
                }
                else{
                    //console.log(result.insertId)
                    res.status(201).send(result)  
            }
                
        })
    })
});

//register a cashier
app.post('/add-cashier', [
    check('username')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({min: 4}) 
    .withMessage('Username should be at least 4 characters long')
    .isLength({max: 20})
    .withMessage('Username cannot be more than 20 characters long')
    .exists()
    .withMessage('Username exists'),
    check('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email should be valid')
    .exists()
    .withMessage('Email exists'),
    check('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 4, max: 20})
    .withMessage('Password should be between 4 - 20 characters'),
    ], (req,res)=> {

    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    var role = "cashier"
    const {username,email,password}=req.body
    //hashPass = await bcrypt.hash(password,10)
    //console.log(password+'\n'+hashPass)
    //console.log(username, password, email) 

    bcrypt.hash(password,saltRounds, (err, hash) => {
        database.query(
            "INSERT INTO account_info (username, email, password,role) VALUES (?,?,?,?)", 
            [username, email, hash, role], 
            (err, result) => {
                if(err){
                    console.log(err)
                    res.status(400)
                     
                }
                else{
                    //console.log(result.insertId)
                    res.status(201).send(result)  
            }
                
        })
    })
});

//for login sessions
app.get('/user-login', (req,res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else {
        res.send({loggedIn: false, user: req.session.user})
    }
})

//authentication for user-login 
app.post('/user-login', (req,res)=> {

    const username = req.body.username;
    const password = req.body.password;
    
    database.query(
        "SELECT * FROM account_info WHERE username = ?", 
        username, 
        (err, result) => {
            if(err){
                res.send({err: err});
            }
            //console.log(password)
            //console.log(result[0].password)
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error,response) => {
                    if(response){
                        req.session.user = result
                        console.log(req.session.user)
                        res.send(result)
                    } else {
                        res.send({message: "Wrong username and/or password!"});
                    }
                }); 
            }
            else {
                return res.status(400).send({message: "User does not exist"});
            }
        });
    });



module.exports = app;