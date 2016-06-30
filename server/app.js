var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//require model
var User = require('../models/user');

var userRoutes = require('../routes/userRoutes');
var millieRoutes = require('../routes/millieRoutes');

// get the express app
var app = express();

//connect to the database - userDb is the database name
mongoose.connect('mongodb://localhost:27017/userDb');

//parse json
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/millie', millieRoutes);

app.get('/', function(req, res) {
  res.sendStatus(200);
});

// server listen
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port ', port);
});
