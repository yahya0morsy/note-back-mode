const mongoose = require('mongoose');
const User = require('../src/schemas/user');
const { comparepass } = require('../public/hasher.js');
require('../public/hasher.js')
Serialize =  async function Serialize(id){
    console.log("inside s");
    const finduser =await User.findOne({_id:id});
    try{
        if(!finduser){console.log("not logged in"),human =null}
         }
         catch(error){}
     
     if(finduser){
         human = finduser.Username
        //logged = true
        } 


}
module.exports = Serialize