'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true},
});


// let db = {};

// let users = {};


users.save = async function(record) {
  // signup : username + password
  if (!users[record.username]) {
    // replace the password text with an encrypted password
    record.password  = await bcrypt.hash(record.password, 5);
    users[record.username] = record;
    return record;
   
  }
  return Promise.reject();
};

// compare the password with the encrypted one
users.authenticateBasic = async function(username, password) {
  let valid = await bcrypt.compare(password, users[username].password);
  return valid ? users[username] : Promise.reject();
};

users.generateToken = function (user) {
  let token = jwt.sign({username: user.username},  );
  return token;
};



module.exports = users;


















module.exports = mongoose.model('users', users);
