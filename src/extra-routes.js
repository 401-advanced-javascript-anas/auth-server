'use strict';

const express = require('express');
const router = express.Router();

// const users = require('./models/users');
const bearerMiddleware = require('./auth/middleware/bearer-auth');


// *********************************************************\\

router.get('/secret', bearerMiddleware, secretHandler);
router.get('/public-route', publicHandler);

// ***********************************************************\\

function secretHandler (req, res){
  console.log('hello from the route handler');
  res.status(200).json(req.user);

}

function publicHandler (req, res){
  res.status(200).send('public-route response !! ');
  
}
  



module.exports = router;