'use strict';

const mongoose = require('mongoose');

const user = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['regular','writers', 'editors', 'administrators'] },
});


module.exports = mongoose.model('user', user);