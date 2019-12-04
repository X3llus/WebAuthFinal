/*
Encryption
includes bcrypt for password encryption
and sets the salt to 12
*/
const bcrypt = require('bcrypt');
const saltRounds = 12;

/*
Express and body parsing
set up the express and parser
and handle all app requests
*/
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

app.post('/makeUser', (req, res) => {
  let toSend = makeUser(req.body)
    .then(toSend => {
      res.json(toSend);
    })
    .catch(err => {
      console.log(err);
      res.end(`"success": false, "data": "a fatal error has occured"`);
    });
});

app.post('/getDestinations', (req, res) => {
  let toSend = getDestinations()
    .then(toSend => {
      res.json(toSend);
    })
    .catch(err => {
      console.log(err);
      res.end(`"success": false, "data": "a fatal error has occured"`);
    })
})

app.listen(80, () => console.log("listening on port 80"));

/*
PostgreSQL connection
set up the database settings
*/
const {
  Pool
} = require('pg')
const pool = new Pool({
  user: "backend",
  password: "!QAZ2wsx",
  host: "localhost",
  port: 5432,
  database: "webauthfinal",
  connectionLimit: 10013
});

/*
Async funtion to add a user to the database
gets the users information from the request data
hashes the password and adds to database
*/
async function makeUser(data) {

  try {
    console.log(data);
    _email = data.email;
    _fName = data.fName;
    _lName = data.lName;
    _pass = data.pass;

    const client = await pool.connect();

    // Encryptes the password
    var salt = await bcrypt.genSaltSync(saltRounds);
    var _hash = await bcrypt.hash(_pass, salt);

    // Addes the user to the database using SQL
    await client.query({
      text: "insert into users (fName, lName, email, password) values ($1, $2, $3, $4)",
      values: [_fName, _lName, _email, _hash]
    });

    client.release()

    return {
      success: true,
      data: "User Created"
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      data: "Email is already in use"
    };
  }
}

async function signIn(data) {

}

/*
Async function to get the destinations
queries all columns and rows from destination table
makes it into a json
and sends it back
*/
async function getDestinations() {
  const client = await pool.connect();

  // query all listings
  _results = await client.query({
    text: "select * from destinations where available > 0"
  });

  // gets the number of listings to go through
  var _id = await client.query({
    text: "select count(id) from destinations where available > 0"
  });

  // adds each row/listing to a new JSON to be sent back
  var _count = Number(_id.rows[0]["count"]);
  let _jString = [];
  if (_count > 0) {
    for (let i = 0; i != _count; i++) {
      _jString.push({
        id: _results.rows[i]["id"],
        title: _results.rows[i]["title"],
        cost: _results.rows[i]["cost"],
        location: _results.rows[i]["location"],
        description: _results.rows[i]["description"],
        startday: _results.rows[i]["startday"],
        endday: _results.rows[i]["endday"],
        available: _results.rows[i]["available"],
        total: _results.rows[i]["total"]
      });
    }

    client.release()

    return {
      success: true,
      data: _jString
    };
  } else {

    client.release()

    return {
      success: false,
      data: "no listings available"
    };
  }
}
