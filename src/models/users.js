'use strict';
require('dotenv').config();

const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // place this in your .env

const db = require('./users-model');


let users = {}; //exporting




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

  let valid = await bcrypt.compare(password, modelRead[0].password);
  return valid ? username : Promise.reject();
};

// *****************************************************\\

users.generateToken = function (user) {
  console.log('user rolee', user.role);
  
  let token = jwt.sign(
    {username: user.username,
      capabilities: user.role,
    }, SECRET );

  return token;
};
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

let roles = {
  regular : ['read'],
  writers : ['read', 'create'],
  editors: ['read', 'update', 'create'],
  administrators: ['read', 'update', 'create', 'delete'],
};

users.permissions = function(capability, role){
  console.log('check herererer',capability, role);
  



  if(role === 'administrators' ){
    for(let i = 0; i < roles.administrators.length;i++){
      if(roles.administrators[i]) return true;
    }
  }
  if(role === 'editors' ){
    for(let i = 0; i < roles.editors.length;i++){
      if(roles.editors[i]) return true;
    }
  }
  if(role === 'regular' ){
    for(let i = 0; i < roles.regular.length;i++){
      if(roles.regular[i]) return true;
    }
  }
  if(role === 'writers' ){
    for(let i = 0; i < roles.writers.length;i++){
      if(roles.writers[i]) return true;
    }
  }
  console.log('the roleeeeee', role);
  
};






module.exports = users;
