'use strict';

const express = require('express');
const router = express.Router();
const users = require('../models/users');
const basicAuth = require('./middleware/basic');
const oauth = require('./middleware/oauth');



// ***********************************************************\\

router.post('/signup', sign_up);
router.post('/signin', basicAuth, sign_in);
router.get('/users', listing);
router.get('/oauth', oauth, oauthFunc);


// *********************************************************\\

function sign_up(req, res, next) { //sign up route if we have the user, return failure, else return generated token.
  
  let user = req.body;
  console.log(user);

  users.save(user).then(result => { // generate a token and return it.
    
    let token = users.generateToken(result);
    res.cookie(token);
    res.status(200).send(token);
  })
    .catch(err=> {
      console.log('ERR!!');
      res.status(403).send('Invalid Signup! email is taken');
    });
}


// check this username if the password submitted matches the encrypted one we have saved in our db
function sign_in(req, res, next) {
  
  res.cookie(req.token);
  res.status(200).send(req.token); 
}


function listing (req, res, next) {
  users.list(undefined).then(result => {
   
    console.log(result);
    res.status(200).send(result);
  }).catch(err=> {
    console.log('ERR!!');
    res.status(403).send('Listing error');
  });
}

function oauthFunc (req, res){
  res.status(200).send(req.token);
}




module.exports = router;


