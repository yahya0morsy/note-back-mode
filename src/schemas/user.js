const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    Username:{
        type: String,
        required: true,
        
    },
    Password:{
        type:String,
        required:true,
        unique:true,
    } ,
})
const User = mongoose.model("User" ,Userschema)
module.exports = User