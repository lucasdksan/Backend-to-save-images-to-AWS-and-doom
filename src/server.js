require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));
app.use(routes);
app.listen(3012);