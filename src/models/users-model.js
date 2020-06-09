'use strict';

const userSchema = require('./users-schama');

class Users {
  constructor(userSchema) {
    this.schama = userSchema;
  }
  async read(record) {

    if (record) {
      console.log('if herererer');
        

      let senc = await userSchema.find({ username : record });

      return senc;

    } else {
      console.log('else herererer');
        
      return await userSchema.find({});
    }
  }
  async create(record) {
    let newUser = new userSchema(record);
    return await newUser.save(record);
  }
}

module.exports = new Users();