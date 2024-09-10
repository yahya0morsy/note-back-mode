const mongoose = require('mongoose')

const Notesschema = new mongoose.Schema({
    owner:{
        type:String,
        required:true
    },
    title:{
        type: String,
       
       
        
    },
    data:{
        type:String,
       
    } ,
})
const Notes = mongoose.model("Notes" ,Notesschema)
module.exports = Notes