const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Load our user model
const User = require("/models/User");

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField : 'email'},(email , password , done) => {
        // Match the user
        User.findOne({email : email})
        .then(user=>{
            if(!user){ // if no match for the entered mail
                return done(null ,false,{message : "Not registered"});
            }
            // comparing the passwords
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    console.log(err);
                }else{
                    if(result == true){
                        return done(null ,user);
                    }else{
                        return done(null ,false,{message : 'pwd is not correct'});
                    }
                }
            });
        })
    })
    );

    passport.serializeUser(function(user,done){ // serialsation of the cookie
        done(null,user.id);
    }); 
    passport.deserializeUser(function(id,done){ // serialsation of the cookie
        User.findById(id,function(err,user){
            done(err,user);
        });
    });  
}