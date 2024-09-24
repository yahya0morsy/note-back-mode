const bcrypt = require('bcrypt');
const saltRounds = 10;
var express = require('express');
passhash = function passhash(password){
    
    const salt = bcrypt.genSaltSync(saltRounds)
    return(bcrypt.hashSync(password, salt))
}

comparepass = function comparepass(plain,hashed){
      return(bcrypt.compareSync(plain,hashed))
}
module.exports = {passhash ,comparepass}