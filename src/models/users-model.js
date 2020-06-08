'use strict';

const userSchema = require('./users-schama');

class Users {
  constructor(userSchema) {
    this.schama = userSchema;
  }
  async get(record) {

    if (record) {

      let senc = await userSchema.find({ username : record });

      return senc;

    } else {
      return await userSchema.find({});
    }
  }
  async post(record) {
    let newUser = new userSchema(record);
    return await newUser.save(record);
  }
}

module.exports = new Users();