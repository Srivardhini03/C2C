require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const passportLocal = require('./config/passportLocal')
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//const flash = require('connect-flash');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'mySecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store:  MongoStore.create({
       mongoUrl:'mongodb://localhost:27017/Proj',
           autoRemove:'disabled'

    },
    function(err){
        console.log(err || "Connect-mongo setup ok");
    }
    )
}));
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthencticatedUser)

app.use('/',require('./routes'));


app.listen(80, function() {
  console.log("Server started on port 80.");
});
