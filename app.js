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

app.use(express.static(__dirname + '/frontend', {
  extensions: ['html']
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.post('/signUp', (req, res) => {
  console.log(req.body);
  let toSend = makeUser(req.body)
    .then(toSend => {
      console.log(toSend);
      res.json(toSend);
    })
    .catch(err => {
      console.log(err);
      res.end(`"success": false, "data": "a fatal error has occured"`);
    });
});

app.post('/signIn', (req, res) => {
  console.log(req.body);
  let toSend = signIn(req.body)
    .then(toSend => {
      res.json(toSend);
    })
    .catch(err => {
      console.log(err);
      res.send(`"success": false, "data": "a fatal error has occured"`);
    });
});

app.post('/getDestinations', (req, res) => {
  console.log(req.body);
  let toSend = getDestinations()
    .then(toSend => {
      res.json(toSend);
    })
    .catch(err => {
      console.log(err);
      res.end(`"success": false, "data": "a fatal error has occured"`);
    });
});

app.post('/getLocation', (req, res) => {
  console.log(req.body);
  let toSend = getLocation(req.body)
    .then(toSend => {
      res.json(toSend);
    })
    .catch(err => {
      console.log(err);
      res.end('"success:" false, "data": "a fatal error has occured"');
    });
});

app.post('/makeOrders', (req, res) => {
  console.log(req.body);
  let toSend = order(req.body)
    .then(toSend => {
      res.json(toSend);
    })
    .catch(err => {
      console.log(err);
      res.end('"success:" false, "data": "a fatal error has occured"');
    })
})

app.listen(8080, () => console.log("listening on port 80"));

/*
PostgreSQL connection
set up the database settings
*/
const {
  Pool
} = require('pg');
const pool = new Pool({
  user: "backend",
  password: "!QAZ2wsx",
  host: "localhost",
  port: 5432,
  database: "webauthfinal",
  connectionLimit: 100
});

/*
Async funtion to add a user to the database
gets the users information from the request data
hashes the password and adds to database
*/
async function makeUser(data) {

  console.log("one");

  try {
    _email = data.email;
    _fName = data.fname;
    _lName = data.lname;
    _pass = data.pass;

    const client = await pool.connect();

    console.log("two");

    // Encryptes the password
    var salt = await bcrypt.genSaltSync(saltRounds);
    var _hash = await bcrypt.hash(_pass, salt);

    // Addes the user to the database using SQL
    await client.query({
      text: "insert into users (fName, lName, email, password) values ($1, $2, $3, $4)",
      values: [_fName, _lName, _email, _hash]
    });

    console.log("three");

    client.release();

    console.log("four")

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

/*
Async function to sign in the user
gets the users hashed password
uses bcrypt to compare the passwords
*/
async function signIn(data) {

  try {
    _email = data.email;
    _pass = data.pass;

    const client = await pool.connect();

    var _hash = await client.query({
      text: "select password from users where email = $1",
      values: [_email]
    });

    const auth = bcrypt.compare(_pass, _hash);

    client.release();

    if (auth) {
      return {
        success: true,
        data: "Authentication Successful"
      };
    } else {
      throw "Authentication Failed";
    }
  } catch(err) {
    return {
      success: false,
      data: err
    };
  }
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
    text: "select location, description, imageurl from destinations where available > 0 order by location"
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
        location: _results.rows[i]["location"],
        description: _results.rows[i]["description"],
        imageurl: _results.rows[i]["imageurl"]
      });
    }

    client.release();

    return {
      success: true,
      data: _jString
    };
  } else {

    client.release();

    return {
      success: false,
      data: "no listings available"
    };
  }
}

/*
Async function to get all resorts at a location
*/
async function getLocation(data) {

  const _location = data.location;

  const client = await pool.connect();

  var _results = await client.query({
    text: "select id, title, cost, startday, endday, available from destinations where location = $1 and available > 0",
    values: [_location]
  });

  let _jString = [];
  for (let i = 0; i < _results.rows.length; i++) {
    const it = _results.rows[i]
    _jString.push({
      id: it["id"],
      title: it["title"],
      cost: it["cost"],
      start: it["startday"],
      end: it["endday"],
      available: it["available"]
    });
  }

  client.release();

  return {
    success: true,
    data: _jString
  };
}

/*
Async function to add an order
*/
async function order(data) {

  _email = data.email;
  _orders = data.orders;

  const client = await pool.connect();



  for (var i = 0; i < _orders.length; i++) {

    await client.query({
      text: "insert into userdestinations (email, locationid, numof) values ($1, $2, $3)",
      values: [_email, _orders[i].id, _orders[i].numOf]
    });

    await client.query({
      text: "update destinations set available = available - $1 where id = $2",
      values: [_orders[i].numOf, _orders[i].id]
    });
  }

  client.release();

  return {
    success: true,
    data: "Ordered"
  };
}
