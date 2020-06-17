'use strict';

const express = require('express');
const router = express.Router();

// const users = require('./models/users');
const bearerMiddleware = require('./auth/middleware/bearer-auth');
const permissions = require('./auth/middleware/authorize');


// *********************************************************\\

router.get('/secret', bearerMiddleware, secretHandler);
router.get('/public-route', publicHandler);

// ***********************************************************\\

function secretHandler (req, res){
  console.log('hello from the secret extra routes handler!!', req.user);
  res.status(200).json(req.user);

}

function publicHandler (req, res){
  res.status(200).send('hello from the public extra routes handler!! ');
  
}


  
router.post('/add', bearerMiddleware, permissions('create'), (req, res)=> {
  res.status(201).send('Route /add worked ');
});

router.get('/read', bearerMiddleware, permissions('read'), (req, res)=> {
  res.status(200).send('Route /read worked');
});


router.put('/change', bearerMiddleware, permissions('update'), (req, res)=> {  // **
  res.status(201).send('Route /change worked ');
});

router.delete('/remove', bearerMiddleware, permissions('delete'), (req, res)=> { // **
  res.status(200).send('Route /remove worked');
});


module.exports = router;