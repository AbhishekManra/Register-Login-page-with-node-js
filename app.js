require('dotenv').config();
const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Project1DB');

// EJS
app.use(expressLayout);
app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}));

app.use("/",require("./routes/index"));
app.use("/user",require("./routes/user"));
app.use("/user",require("./routes/user"));

app.listen(3000,function(){
    console.log("Server Started");
});