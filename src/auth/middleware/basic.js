'use strict';

const users = require('../../models/users');
const base64 = require('base-64');

module.exports = (req, res, next) => {
  
  if (!req.headers.authorization) {
    next('invalid Login');
    return;
  }
  
  console.log('req.headers.authorization >>>> ',req.headers.authorization);
  let basic = req.headers.authorization.split(' ').pop();

  
  let [user, pass] = base64.decode(basic).split(':'); 

  console.log(user);
  console.log(pass);
  
  
    
  users.authenticateBasic(user, pass).then(validUser => {
    req.token = users.generateToken(validUser);
    next();
  })
    .catch(err => next('Invalid Login!!'));

};



























// const base64 = require('base-64');
// const users = require('../../models/users-model');

// module.exports = (req, res, next) => {
//   if (!req.headers.authorization) {
    
//     next('Invalid Login');
//   } else {
    
//     const basic = req.headers.authorization.split(' ').pop();

//     const [user, pass] = base64.decode(basic).split(':');
    
//     users.authenticateBasic(user, pass)
//       .then(validator => {
//         req.token = users.getToken(validator);
       
//         next();
//       }).catch(err => {
//         next(err.message);
//       });
//   }
// };