var express = require('express');
var router = express.Router();

var User = require('../models/user');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// get all
router.get('/all', function(req, res) {
  User.find({}, function(err, usersList) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.send(usersList);
    }
  });
}); //end get all users

// create route
router.post('/create', function(req, res) {
  console.log('hit create route');
  console.log('req.body = ', req.body);

  var newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('User saved successfully!');
      res.sendStatus(200);
    }
  });
});

module.exports = router;
