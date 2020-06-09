'use strict';
require('dotenv').config();

const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // place this in your .env
// console.log('token',SECRET);
const db = require('./users-model');


let users = {}; //exporting




users.save = async function(record){
  let reading = await db.read(record.username);
  if (!reading[0]) {
    record.password  = await bcrypt.hash(record.password, 5);
    await db.create(record);
    return record;
  }
  // let addNewNote =await db.create(record);
  return Promise.reject();
};


// compare the password with the encrypted one
users.authenticateBasic = async function(username, password) {
  
  let reading = await db.read(username);

  let valid = await bcrypt.compare(password, reading[0].password);
  return valid ? username : Promise.reject();
};


users.generateToken = function (user) {
  let token = jwt.sign({username: user.username}, SECRET );
  return token;
};
users.list = async function(record){
  let reading = await db.read(record);
  
  return reading;
};


users.varifyToken = async function (token) {
  // let reading = await model.read(token);
  return jwt.varify(token, SECRET, function(err, decoded){
    if(err){
      console.log('err>>> ', err);
      return Promise.reject(err);
        
    }
    console.log('decoded >>>> ',decoded); // {username: usernameValue, ...}
      
    let username = decoded['username']; // decoded.username
    if (db[username]) {
      return Promise.resolve(decoded);
    } 
    return Promise.reject();
  });
};
  




module.exports = users;













// 'use strict';
// require('dotenv').config();
// const bcrypt =  require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = 'mysecrettokenkey'; // place this in your .env
// const model = require('../models/users-model');

// // let db = {};

// let users = {};



// users.save = async function(record) {
//   // signup : username + password
//   let reading = await model.read(record.username);
//   if (!reading[0]) {
//     console.log('hiiiiiiiiiiiiiiiiii');
      
//     record.password  = await bcrypt.hash(record.password, 5);
//     await model.create(record);
//     return record;
//   }
//   return Promise.reject();
// };


// // sign in
// // compare the password with the encrypted one
// users.authenticateBasic = async function(username, password) {
//   console.log('ggggggggggg',username);
//   console.log('jjjjjjjjjj',password);
//   let reading = await model.read(username);
//   console.log('readddddd',reading);
//   let valid = await bcrypt.compare(password, reading[0].password);
//   console.log('validddddddd',valid);
//   return valid ? username : Promise.reject();
// };





// users.generateToken = function (user) {
//   let token = jwt.sign({username: user.username}, SECRET );
//   return token;
// };



// users.listAll = async function(){
//   let reading = await model.read(undefined);
//   console.log('readingggggg',reading);
  
//   return reading;
    
// };




// users.varifyToken = async function (token) {
//   // let reading = await model.read(token);
//   return jwt.varify(token, SECRET, function(err, decoded){
//     if(err){
//       console.log('err>>> ', err);
//       return Promise.reject(err);
      
//     }
//     console.log('decoded >>>> ',decoded); // {username: usernameValue, ...}
    
//     let username = decoded['username']; // decoded.username
//     if (username) {
//       return Promise.resolve(decoded);
//     } 
//     return Promise.reject();
//   });
// };



// module.exports = users;