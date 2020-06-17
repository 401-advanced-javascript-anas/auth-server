'use strict';
require('dotenv').config();

const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // place this in your .env

const db = require('./users-model');


let users = {}; //exporting



let roles = {
  regular : ['read'],
  writers : ['read', 'create'],
  editors: ['read', 'update', 'create'],
  administrators: ['read', 'update', 'create', 'delete'],
};

// ***************************************\\

users.save = async function(record){
  let modelRead = await db.read(record.username);
  if (!modelRead[0]) {
    record.password  = await bcrypt.hash(record.password, 5);
    await db.create(record);
    return record;
  }
  
  return Promise.reject();
};


// **********************************************\\

// compare the password with the encrypted one
users.authenticateBasic = async function(username, password) {
  
  let modelRead = await db.read(username);
  
  // console.log('------------------------------',password, modelRead[0].password );

  let valid = await bcrypt.compare(password, modelRead[0].password);
  return valid ? username : Promise.reject();
};

// *****************************************************\\

users.generateToken = function (user) {
  // let anas = roles[user.role];
  // console.log('user rolee', anas);
  // console.log('user');
  
  
  let token = jwt.sign(
    {
      username: user.username,
      capabilities: roles[user.role],
      expiresIn:900,
    }, SECRET );

  return token;
};


// *****************************************************\\

users.generateTokenIn = async function (user) {
  // let anas = roles[user.role];
  // console.log('user rolee', anas);
  console.log('user', user);
  let modelRead = await db.read(user);
  console.log(modelRead[0].role);
  

  
  let token = jwt.sign(
    {
      username: user,
      capabilities: roles[modelRead[0].role],
      expiresIn:900,
    }, SECRET );

  console.log(token);

  return token;
};

// *******************************************\\

users.list = async function(record){
  let modelRead = await db.read(record);
  
  return modelRead;
};

// **************************************************\\

users.verifyToken = function (token) {
  // console.log('I got my tokenn~~ ',token);

  return  jwt.verify(token, SECRET,async function(err, decoded){
    if (err) {
      // console.log(' there is an error is here~~~ ', err);

      return Promise.reject(err);
    }
    
    // console.log('decoded >>>> ',decoded.username); 

    let username = decoded['username']; 
    // console.log(' testing if username is here~~ ',username);

    let modelRead = await db.read(username);
    console.log(modelRead);

    if (modelRead[0]) {
      return Promise.resolve(decoded);
    } 
    return Promise.reject();
  });
};
// *******************************************************\\




module.exports = users;
