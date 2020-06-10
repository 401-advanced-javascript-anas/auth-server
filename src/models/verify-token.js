// 'use strict';


// require('dotenv').config();

// const schema = require('./users-schama');
// const Model = require('./model');


// // const bcrypt =  require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = process.env.SECRET; 
// // console.log('token',SECRET);
// // const db = require('./users-model');

// class Users extends Model{
//   constructor() {
//     super(schema);
  
//   }

//   async authenticateToken  (token) {
//     try {
//       const tokenObject = await jwt.verify(token, SECRET);
//       const result = await this.get({username : tokenObject.username});
//       if (result.length != 0) {
//         return Promise.resolve(result[0]);
//       } else {
//         return Promise.reject('User is not found!');
//       }
//     } catch (e) {
//       return Promise.reject(e.message);
//     }
//   }


// }  

// module.exports = new Users(schema);
  




