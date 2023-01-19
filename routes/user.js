const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const saltrounds = 10;
//user model
const User = require("../models/User");

router.get("/login",(req,res)=> res.render("login"));

router.get("/register",(req,res)=> res.render("register"));

//post request for register to get the parsed data from the .ejs and add it to our database

router.post("/register",(req,res)=> {
    // extracting the content out of our ejs file
    // instead of using req.body.___
    // we will use a new method
    const {name ,email ,password,password2} = req.body;
    var error = [];

    // checking the required fields
    if(!name || !email || !password || !password2){
        error.push({msg : 'please fill all the fields'});
    }

    //check if the password matches or not password2
    if(password !== password2){
        error.push({msg : "password doesn't match"});
    }
    
    //check password match
    if(password.length < 6){
        error.push({msg : "password must be at least 6 letters"});
    }

    //need to look after this
    if(error.length > 0){
        res.render("register",{
            error,
            name,
            email,
            password,
            password2
        });
    }else{
        // user is validated
        User.findOne({email : email},function(err,data){
            if(data){
                error.push({msg : "User already exist"});
                res.render("register",{
                    error,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                //salting our password with bcrot
                bcrypt.hash(password,saltrounds,function(err,hash){
                    if(err){
                        console.log(err);
                    }else{
                        const newuser = new User({
                            name,
                            email,
                            password,
                            password2
                        });
                        
                        newuser.password = hash;
                        newuser.save(function(err){
                            if(err){
                                console.log(err);
                            }else{
                                res.redirect("/user/login");
                            }
                        });
                    }
                });
            }
        })
    }
})

module.exports= router;