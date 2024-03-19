const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'userdb',
});

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.post('/register', (req, res) => {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    address,
    country,
    phone,
  } = req.body;

  const sql = `INSERT INTO userdb.users (email, username, password, first_name, last_name, address, country, phone) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [email, username, password, firstName, lastName, address, country, phone],
    (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('User registered successfully');
        res.status(200).send('User registered successfully');
      }
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM userdb.users WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (result.length > 0) {
        // Authentication successful
        const user = result[0]; // Assuming you want to send the first user if multiple matches
        res.status(200).json({
          email: user.email,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          country: user.country,
          phone: user.phone,
        });
      } else {
        // Authentication failed
        res.status(401).send('Invalid username or password');
      }
    }
  });
});

app.post('/upload-location', (req, res) => {
  const { username, latitude, longitude, timestamp } = req.body;

  const sql = `INSERT INTO userdb.locationdb (username, latitude, longitude, timestamp) 
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [username, latitude, longitude, timestamp], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Location uploaded successfully');
      res.status(200).send('Location uploaded successfully');
    }
  });
});

app.get('/location-history/:username', (req, res) => {
  const username = req.params.username;

  const sql = 'SELECT * FROM userdb.locationdb WHERE username = ?';

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json(result);
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
