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
        maxAge: 60*60*24*1000
    }
}))

//get data from account-info table 
app.get('/account-info/:id', (req,res) => {
    const id = req.params.id

    database.query("SELECT * FROM account_info WHERE id = ?", id,
    (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length) {
            console.log(result)
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
app.post('/add-cashier', [
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

//for login sessions
app.get('/user-login', (req,res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    } else{
        res.send({loggedIn: false})
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
                        console.log(result)
                        req.session.user = result
                        console.log(req.session)
                        res.send(result)
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
app.post('/edit-username/:id', [
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
        var id= req.params.id;
        var username = req.body.username;

        console.log(id)
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
app.post('/edit-email/:id', [
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
        var id= req.params.id;
        var email = req.body.email;

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
        database.query('SELECT COUNT(*) AS total FROM account_info WHERE email = ?', [email], (error, results, fields) => {
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
        database.query('SELECT COUNT(*) AS total FROM account_info WHERE username = ?', [username], (error, results, fields) => {
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