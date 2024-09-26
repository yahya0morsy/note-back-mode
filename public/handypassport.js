const mongoose = require('mongoose');
var express = require('express');
const User = require('../src/schemas/user');
const { comparepass } = require('../public/hasher.js');
require('../public/hasher.js')
Login =async function Login(req,res,next){
    const {body} =req
    console.log("workes");
    const finduser =await User.findOne({Username:req.body.Username});
    try{
        if(!finduser){console.log("username not found");next()}
        if(finduser&&!comparepass(req.body.Password,finduser.Password)){console.log("wrong password"),next()}
         }
         catch(error){console.log(error)}
     
     if(finduser && comparepass(req.body.Password,finduser.Password)){
        console.log("hi")
        req.body.human = finduser.Username
        req.body.id = finduser._id;
        next()
        //logged = true
        } 


}
module.exports = Login