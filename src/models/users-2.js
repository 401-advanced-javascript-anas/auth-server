// 'use strict';

// require('dotenv').config();


// const mongoose = require('mongoose');

// const user = mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, enum: ['regular','writers', 'editors', 'administrators'] },
// });




// let roles = {
//   regular : ['read'],
//   writers : ['read', 'create'],
//   editors: ['read', 'update', 'create'],
//   administrators: ['read', 'update', 'create', 'delete'],
// };
  
// user.statics.permissions = function(capability, role){
//   console.log('check herererer',capability, role);
    
  
  
  
//   if(role === 'administrators' ){
//     for(let i = 0; i < roles.administrators.length;i++){
//       if(roles.administrators[i]) return true;
//     }
//   }
//   if(role === 'editors' ){
//     for(let i = 0; i < roles.editors.length;i++){
//       if(roles.editors[i]) return true;
//     }
//   }
//   if(role === 'regular' ){
//     for(let i = 0; i < roles.regular.length;i++){
//       if(roles.regular[i]) return true;
//     }
//   }
//   if(role === 'writers' ){
//     for(let i = 0; i < roles.writers.length;i++){
//       if(roles.writers[i]) return true;
//     }
//   }
//   console.log('the roleeeeee', role);
    
// };
  
  
// module.exports = mongoose.model('user', user);