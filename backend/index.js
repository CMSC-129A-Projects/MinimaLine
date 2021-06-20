var express = require('express');
var app = express();
var bcrypt = require('bcrypt');
//var upload = require('express-fileupload');
var cors = require("cors");
var database = require('./config/database');
var port = process.env.PORT || 3005;

//Connect to database
// database.connect((err) => {
//     if (err) throw err;
// });

//allow access of rest api for cross-origin resource sharing
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST","GET","DELETE","OPTIONS","PUT"],
    credentials: true
}));

//to make upload folder public
//app.use('/public/uploads',express.static('public/uploads'));

//allow api for parsing json
app.use(express.json());

//allow api to receive data from client app
app.use(express.urlencoded ({
    extended: false
}));

//Register routes in main index.js
app.use('/', [
    require('./routes/store-info'),
    require('./routes/account-info'),
    require('./routes/menu')
]);

//http://localhost:3001/ (index.js)
//http://localhost:3001/sign-in
//http://localhost:3001/start-page
//http://localhost:3001/store-registration

app.listen(port, () => {
    console.log(`Listening at port http://localhost:${port}`);
});
