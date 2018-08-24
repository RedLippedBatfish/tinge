const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const Users = require('./controllers/Users');

// Create connection to Mongo DB via Mongoose
mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => console.log('Hello from tinge-db!'));
mongoose.Promise = global.Promise;

// Configure Express Application Server
const app = express();
const PORT = process.env.PORT || 8080;

// Set up body-parser for processing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS to allow different hosts to connect to our server
app.use(cors());

// Dummy Route
app.get('/', (req, res) => {
  res.send('Hello Brit');
});

// Signup Route
app.post('/signup', Users.createUser, (req, res) => {
  res.json({ username: res.locals.username, _id: res.locals._id });
});

// Start server
app.listen(PORT, () => console.log('Server started on port', PORT));
