var express = require('express');
var router = express.Router();
var User = require('../src/schemas/user.js');
var Notes = require('../src/schemas/notes.js');
const mongoose = require('mongoose');


require('../public/hasher.js')
var Login = require('../public/handypassport.js')
var Serialize = require('../public/serialize.js')
router.use(Login)
router.use(Serialize)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log("database connect")
});
router.post('/log',async function(req, res ) {
  const {body} = req
  req.body.Password = passhash(req.body.Password)
  const z = await User.findOne({Username:req.body.Username})
  if(z){
    return(console.log("username exist"),
    res.send('username exist'))};
  try{
  const x = new User(req.body)
  const saveduser =await x.save() 
  return(res.status(200),res.send('user is added'))}catch(error){return(res.send(error))}
});
router.get('/log',async function(req, res) {
  const {body} = req
  const x =await User.findOne({Username:req.body.Username})
  //req.session.visited = true;

  if(x.Username==req.body.Username && x.Password==req.body.Password&& req.user){
  return(
  res.send(x), console.log(req.session.id)
)}
 
return(res.send('user not found'))
   
});
router.post('/log/auth',Login,async function(req, res){
 //await Login(req.body.Username,req.body.Password)
  if(!req.body.human){res.send('wrong data')}
  if(req.body.human){
    //res.cookie
    res.send({Message:"logged in",username:req.body.human,id:req.body.id}),
    console.log(req.body.id)
    }
});
router.post('/notes/save',Serialize,async function(req,res){
    const {body}=req
  if(!req.body.human){res.send('please log in first')}
  else if(!req.body.title){res.send('add a title please')}
  else if(!req.body.data){res.send('can not save emty note')}
  else{
    try{
     // const findowner = await User.findOne({_id:req.body.id})
      //req.body.owner = findowner.Username
      const findtitle = await Notes.findOne({owner:req.body.owner, title:req.body.title})
      if(findtitle){res.send('title exist')}
      if(!findtitle){ const note = new Notes(req.body)
        const saveduser =await note.save() 
        return(res.send('note saved'))}
     }catch(error){return(res.send(error))}
  }
  

 
});
router.patch('/notes/edit',Serialize,async function(req,res) {
    if(!req.body.human){res.send('please log in first')};
  if(req.body.human){try{
    const {body} = req
    const TheNote = { title:req.body.title,owner:req.body.owner };
    const UpdateFields = { $set: {title:req.body.Ntitle, data:req.body.data } };
    await Notes.updateOne(TheNote,UpdateFields)
    res.send('note updated')
  } catch(error){res.send(error)}
    
}
  

  
})
router.get('/notes/show',Serialize,async function(req,res){
    if(!req.body.human){res.status(404).send("please log in first!");};
    if(req.body.human){try{
      const note = await Notes.find({owner:req.body.human})
      res.send(note)}
  catch(error){res.send(error)}}
  
})
router.get('/notes/showw',async function(req,res){
 try{
    const {body} = req
    const note = await Notes.find({owner:req.session.owner})
    res.send(note)}
  catch(error){res.send(error)}
})
router.get('/session',function(req, res ,done) {
  console.log(req.session)
  res.send("working fine like wine")
  done
})
router.post('/notes/delete',Serialize,async function(req,res){
    if(!req.body.human){res.status(404).send("please log in first!")};
  if(req.body.human){try{
    const{body}=req
    await Notes.deleteOne({owner:req.body.owner, title:req.body.title})
    res.send('done')
  }
  catch(error){res.send(error)}}
 
  

})
router.get('/notes/user',Serialize,async function(req,res) {

    if(!req.body.human){res.status(404).send("please log in first!")}
    if(req.body.human){const finduser =await User.findOne({Username:req.body.owner})
      res.send({Username:finduser.Username,DisplayedName:finduser.DisplayedName})}
  
})
router.patch('/notes/user/changepass' ,Serialize,async function(req,res) {
 
    if(!req.body.human){res.status(404).send("please log in first!")}
  if(req.body.human){
    const {body}=req
   const finduser =await User.findOne({Username:req.body.owner})
    if(comparepass(req.body.currentPassword,finduser.Password)){
      const oldpass ={Password:finduser.Password}
      const newpass ={ $set: {Password:passhash(req.body.newPassword)} }
      await User.updateOne(oldpass,newpass)
      res.send('password has changed')
    }
    if(!comparepass(req.body.currentPassword,finduser.Password)){
      res.send('current password is not right')
    }
  
  
  }
  router.get('/notes/showw',async function(req,res){
 try{
    const {body} = req
    const note = await Notes.find({owner:req.session.owner})
    res.send(note)}
  catch(error){res.send(error)}
})

})
router.get('/notes/test',async function(req,res){
  try{
     const {body} = req
     const note = await Notes.find({owner:req.session.owner})
     res.send(note)}
   catch(error){res.send(error)}
 })
//test

module.exports = router;
