require('newrelic');
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
//
module.exports = app;
