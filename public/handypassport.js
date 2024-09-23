const mongoose = require('mongoose');
const User = require('../src/schemas/user');
const { comparepass } = require('../public/hasher.js');
require('../public/hasher.js')
Login =async function Login(username,password){
    console.log("workes");
    const finduser =await User.findOne({Username:username});
    try{
        if(!finduser){console.log("username not found"),human =null}
        if(!comparepass(password,finduser.Password)){console.log("wrong password"),human =null}
         }
         catch(error){}
     
     if(finduser && comparepass(password,finduser.Password)){
        console.log("hi")
         human = finduser.Username
         id = finduser._id
         
        //logged = true
        } 


}
module.exports = Login