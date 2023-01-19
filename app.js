const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

require('./config/passport')(passport);

mongoose.connect('mongodb://127.0.0.1:27017/Project1DB');

// EJS
app.use(expressLayout);
app.set("view engine","ejs"); // ejs view engine

app.use(express.urlencoded({extended:false})); // body-parser

//express session
app.use(session({
  secret: 'littlesecret',
  resave: true,
  saveUninitialized: true
}))


app.use(passport.initialize());
app.use(passport.session());

  //connect flash : allows the developers to send a message whenever a user is redirecting to a specified web-page
  app.use(flash());

  // global variables
  app.use((req,res,next)=> {
    res.locals.sucess_msg = req.flash("sucess_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
  });


  app.use("/",require("./routes/index"));
  app.use("/user",require("./routes/user"));


app.listen(3000,function(){
    console.log("Server Started");
});