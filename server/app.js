var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//require model
var User = require('../models/user');

var generalRoutes = require('../routes/generalRoutes');
var millieRoutes = require('../routes/millieRoutes');

// get the express app
var app = express();

//connect to the database - userDb is the database name
mongoose.connect('mongodb://localhost:27017/userDb');

//parse json
app.use(bodyParser.json());

app.use('/general', generalRoutes);
app.use('/millie', millieRoutes);

// server listen
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port ', port);
});
