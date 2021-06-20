var express = require('express');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const {check, validationResult} = require('express-validator');
var app = express();
var database = require('../config/database');
var jwt = require('jsonwebtoken');
var Auth = require('../jwt-auth.js');

app.use(express.json());
app.use(cookieParser());

app.post('/renewToken', (req,res) => {
    console.log("renewtoken")
    let existingToken = Auth.checkRefreshToken(req.body.refreshToken)

    if(!existingToken)
        return res.status(403).send({message: "Forbidden"})
    else{
        jwt.verify(req.body.refreshToken, "refresh-secret", (err,user)=>{
            if(!err){
                // console.log(user)
                const data = {id: user.id, role: user.role}
                const newToken = jwt.sign(data,"access-secret", {expiresIn: "1d"});
                console.log(`new token: ${newToken}`)
                return res.send({accessToken: newToken});
            }
            else{
                console.log("Unverified!");
                return res.status(403).send({message: "Forbidden"})
            }
        })
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
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error,response) => {
                    if(response){
                        const tokens = Auth.createTokens({id: result[0].id, role: result[0].role})
                        res.send({
                            id: result[0].id,
                            role: result[0].role,
                            accessToken: tokens.accessToken,
                            refreshToken: tokens.refreshToken})
                    } else {
                        res.send({message: "Incorrect username and password combination!"});
                    }
                }); 
            }
            else {
                return res.send({message: "User does not exist!"});
            }
    });
});

//get data from account-info table 
app.get('/account-info', Auth.checkAccessToken, (req,res) => {
    const id = req.userId
    database.query("SELECT * FROM account_info WHERE id = ?", id,
    (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length) {
            // console.log(result)
            res.status(200).send(result);
        }
        else res.status(200).json({});
    });
});

//to register user info in account_info table 
app.post('/user-registration', [
    check('username') //OK alphanumeric, underscore, period, hyphen; NO spaces and special chars
    //.notEmpty()
    //.isLength({min: 4}) 
    //.withMessage('Username should be at least 4 characters long')
    //.isLength({max: 20})
    //.withMessage('Username cannot be more than 20 characters long'),
        .custom(async username => {
            const value = await isUsernameUsed(username);
            if (value) {
                throw new Error('Username is already in use!');
            }
    }),
    check('email') //check for special chars before @ (OK alphanumeric, underscore, period, hyphen)
    //.notEmpty()
    //.withMessage('Email cannot be empty')
    //.isEmail()
    //.withMessage('Email should be valid'),
        .custom(async email => {
            const value = await isEmailUsed(email);
            if (value) {
                throw new Error('E-mail is already in use!');
            }
        }),
    check('password') // 
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 6, max: 20})
    .withMessage('Password should be between 6-20 characters!')
    ], (req,res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return res.send({errors: errors.array()});
    }
    var role = "manager"
    const {username,email,password}=req.body
    
    bcrypt.hash(password,saltRounds, (err, hash) => {
        database.query(
            "INSERT INTO account_info (username, email, password,role) VALUES (?,?,?,?)", 
            [username, email, hash, role], 
            (err, result) => {
                if(err){
                    // console.log(err)
                    res.status(400)
                }
                else{
                    console.log(result)
                    res.status(201).send(result)  
            }
                
        })
    })
});

//register a cashier
app.post('/add-cashier', Auth.checkAccessToken, [
    check('username')
        .notEmpty()
        .withMessage('Username cannot be empty')
        .isLength({min: 4}) 
        .withMessage('Username should be at least 4 characters long')
        .isLength({max: 20})
        .withMessage('Username cannot be more than 20 characters long')
        .custom(async username => {
            const value = await isUsernameUsed(username);
            if (value) {
                throw new Error('Username is already in use!');
            }
        }),
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

app.post('/edit-username', Auth.checkAccessToken, [
    check('username') //OK alphanumeric, underscore, period, hyphen; NO spaces and special chars
        // .notEmpty()
        // .isLength({min: 4}) 
        // .withMessage('Username should be at least 4 characters long')
        // .isLength({max: 20})
        // .withMessage('Username cannot be more than 20 characters long')
        .custom(async username => {
            const value = await isUsernameUsed(username);
            if (value) {
                throw new Error('Username is already in use!');
            }
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.send({errors: errors.array()});
        }
        let id = req.userId;
        let username = req.body.username;

        database.query("UPDATE account_info SET username=? WHERE id = ? ", [username,id],
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
app.post('/edit-email', Auth.checkAccessToken,[
    check('email')
        .custom(async email => {
            const value = await isEmailUsed(email);
            if (value) {
                throw new Error('E-mail is already in use!');
            }
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.send({errors: errors.array()});
        }
        let id = req.userId;
        let email = req.body.email;

        console.log(id)
        database.query("UPDATE account_info SET email=? WHERE id = ? ", [email,id],
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

// custom validator functions
function isEmailUsed(email){
    return new Promise((resolve, reject) => {
        database.query('SELECT COUNT(*) AS total FROM account_info WHERE email = ?', [email], (error, results) => {
            if(!error){
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error'));
            }
          }
        );
    });   
}
function isUsernameUsed(username){
    return new Promise((resolve, reject) => {
        database.query('SELECT COUNT(*) AS total FROM account_info WHERE username = ?', [username], (error, results) => {
            if(!error){
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error'));
            }
          }
        );
    });   
}

module.exports = app;