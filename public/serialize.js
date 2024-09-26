const mongoose = require('mongoose');
const User = require('../src/schemas/user');
const { comparepass } = require('../public/hasher.js');
require('../public/hasher.js')
Serialize =  async function Serialize(req,res,next){
    console.log("inside s");
    const finduser =await User.findOne({_id:req.body.id});
    try{
        
        if(!finduser){console.log("not logged in"),next()}
         }
         catch(error){console.log(error)}
     
     if(finduser){
         req.body.human = finduser.Username
         req.body.owner = finduser.Username
         next()
        //logged = true
        } 


}
module.exports = Serialize