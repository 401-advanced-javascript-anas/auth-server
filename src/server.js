'use strict';

require('dotenv').config();

const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const users = require('./models/users');
// const basicAuth = require('./auth/middleware/basic');
const router = require('./auth/routes');


app.use(express.static('./public'));
app.use(express.json()); 
app.use(cors());
app.use(morgan('dev'));



app.use(router);


module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });
  },
};
  

