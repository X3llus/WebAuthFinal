//----------------------------------------------------------------------------//
// encryption library things
const bcrypt = require('bcrypt');
const saltRounds = 12;

//----------------------------------------------------------------------------//
// code to listen for requests
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static(__dirname + '/Frontend', {
  extensions: ['html']
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//----------------------------------------------------------------------------//
// database connection
const {
  Pool
} = require('pg')
const pool = new Pool({
  user: "backend",
  password: null,
  host: "localhost",
  port: 5432,
  database: "webauthfinal",
  connectionLimit: 100
});

//----------------------------------------------------------------------------//
// add a user to the database
