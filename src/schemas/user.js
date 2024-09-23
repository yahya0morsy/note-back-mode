const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    Username:{
        type: String,
        required: true,
        
    },
    DisplayedName:{
        type: String,
        required: true,
    },
    Password:{
        type:String,
        required:true,
        unique:false,
    } ,
})
const User = mongoose.model("User" ,Userschema)
module.exports = User