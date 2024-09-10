var passport = require('passport');
var Localstrategy = require('passport-local');
const mongoose = require('mongoose');
const User = require('../src/schemas/user');
passport.serializeUser((user,done)=>{
    console.log("inside s")
    done(null,user.id)
})
passport.deserializeUser((id, done)=> {
    console.log("inside d")
    console.log(id)
    const finduser=User.findOne({_id:id})
    if(finduser)done(null,id)
    
});
module.exports = passport.use(new Localstrategy(async(username,password ,done) =>{
    console.log("workes");
    const finduser =await User.findOne({Username:username});
    try{
        
        if(!finduser)console.log("username not found"),done(null,null);
        if(finduser.Password !== password)console.log("wrong password"),done(null,null);
         }
         catch(error){}
     
     if(finduser && finduser.Password === password){ console.log("logged in"),done(null ,finduser)}
        
    
  })

)