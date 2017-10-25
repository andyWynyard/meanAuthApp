const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to DB
mongoose.connect(config.database);

// On successful connection to DB
mongoose.connection.on('connected', () => {
    console.log('\n************************************************************');
    console.log('* Connected to DB: ' + config.database + ' *');
    console.log('************************************************************' + '\n');
});

// On failure connecting to the DB
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

// Port number
const port = process.env.PORT || 8080;

// CORS middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('\n**********************************************************');
    console.log('**   Server started on localhost:' + port + ' <> Ctrl-C to terminate   **');
    console.log('**********************************************************' + '\n');
});
