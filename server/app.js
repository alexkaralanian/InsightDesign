const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');


app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal Error");
})

module.exports = app
