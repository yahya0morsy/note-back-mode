var express = require('express');
var router = express.Router();
var User = require('../src/schemas/user.js');
var Notes = require('../src/schemas/notes.js');
const mongoose = require('mongoose');
const session = require('express-session');
require('../public/local-strategy.js');
var passport = require('passport');
var trying = require('../public/try.js')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("database connect")
});
router.post('/log',async function(req, res ) {
  const {body} = req
  const z = await User.findOne({Username:req.body.Username})
  if(z){
    return(console.log("username exist"),
    res.send('username exist'))};
  try{
  const x = new User(req.body)
  const saveduser =await x.save() 
  return(res.send('user is added'))}catch(error){return(res.send(error))}
});
router.get('/log',async function(req, res) {
  const {body} = req
  const x =await User.findOne({Username:req.body.Username})
  req.session.visited = true;

  if(x.Username==req.body.Username && x.Password==req.body.Password&& req.user){
  return(
  res.send(x), console.log(req.session.id)
)}
 
return(res.send('user not found'))
   
});
router.post('/log/auth',passport.authenticate('local') ,async function(req, res){
  req.session.visited = true;
    const findowner = await User.findOne({_id:req.user})
    req.session.owner = findowner.Username
    if(!req.user){res.send('wrong data')}
 
  if(req.user){
    res.send('logged in'),
    console.log(req.user.id)
    
    }
});
router.post('/notes/save',async function(req,res){
  const {body}=req
  if(!req.user){res.send('please log in first')}
  else if(!req.body.title){res.send('add a title please')}
  else if(!req.body.data){res.send('can not save emty note')}
  else{
    try{
      const findowner = await User.findOne({_id:req.user})
      req.body.owner = findowner.Username
      const findtitle = await Notes.findOne({owner:findowner.Username, title:req.body.title})
      if(findtitle){res.send('title exist')}
      if(!findtitle){ const note = new Notes(req.body)
        const saveduser =await note.save() 
        return(res.send('note saved'))}
     }catch(error){return(res.send(error))}
  }
 
});
router.get('/notes/show',async function(req,res){
  if(!req.user){res.send('please log in first')};
  if(req.user){try{
    const {body} = req
    const note = await Notes.find({owner:req.session.owner})
    res.send(note)}
  catch(error){res.send(error)}}
})
router.get('/session',function(req, res ,done) {
  console.log("hey")
  res.send("working fine like wine")
  done
})
router.post('/notes/delete',async function(req,res){
  if(!req.user){res.send('please log in first')};
  if(req.user){try{
    const{body}=req
    await Notes.deleteOne({owner:req.session.owner, title:req.body.title})
    res.send('done')
  }
  catch(error){res.send(error)}}
 
  
})

module.exports = router;
