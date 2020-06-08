'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('*', notFoundHandler);
app.use(errorHandler);
app.use(modelRouter);

// ****************************************** \\

const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
const modelRouter = require('./auth/routes');

// *********************************************** \\

module.exports = {
  server: app,
  start: (port) =>{
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => {console.log(`App is listening on ${PORT}`);
    });
  },
};
