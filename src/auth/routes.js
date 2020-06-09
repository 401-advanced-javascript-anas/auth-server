'use strict';

const express = require('express');
const router = express.Router();
const users = require('../models/users');
const basicAuth = require('./middleware/basic');
const oauth = require('./middleware/oauth');


router.post('/signup', sign_up);
router.post('signin',basicAuth, sign_in);
router.get('/list', listRoute);
router.get('/users', listing );
router.get('/oauth', oauth, oauthFunc);



function sign_up (req, res) {
  //sign up route if we have the user, return failure, else return generated token.
  let user = req.body;
  console.log(user);
  users.save(user).then(result => {
    // generate a token and return it.
    let token = users.generateToken(result);
    res.status(200).send(token); })
    .catch(err=> {
      console.log('ERR!!');
      res.status(403).send('Invalid Signup! email is taken');
    });

}
// check this username if the password submitted matches the encrypted one we have saved in our db
function sign_in (req, res){
  res.status(200).send(req.token); // return token 
}

function listRoute (req, res) {
  res.status(200).send(users.list());
}


function listing (req, res){
  users.listAll().then(data =>{
    res.status(200).send(data);
  });
} 

function oauthFunc (req, res) {
  res.status(200).send(req.token);
}


module.exports = router;