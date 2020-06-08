'use strict';

const mongoose = require('mongoose');

const server = require('./src/server');

const MONGODB_URI = 'mongodb://localhost:27017/lab11';


const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(MONGODB_URI, mongooseOptions);

server.start();
