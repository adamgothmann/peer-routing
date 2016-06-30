var express = require('express');
var router = express.Router();

var User = require('../models/user');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// get all users
router.get('/user/all', function(req, res) {
  User.find({}, function(err, usersList) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.send(usersList);
    }
  });
}); //end get all users

// create user route
router.post('/user/create', function(req, res) {
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

// get single user

router.get('/user/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send(user);
      }
  });
});

// update single user
// accepts one field change per request

router.put('/user/update/:id', function(req, res) {
  var fieldName;
  var fieldValue;
  for ( var key in req.body) {
    console.log('key is' + key);
    fieldName = key;
    console.log('value is' + req.body[key]);
    fieldValue = req.body[key];
  }
  User.findOne({_id: req.params.id}, function(err, userResult) {
    console.log('find user result = ', userResult);

    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      userResult[fieldName] = fieldValue;

      userResult.save(function(err) {
        if(err){
          console.log(err);
          res.sendStatus(500);
        }else{
          console.log('Update user = ', userResult._id);
          res.sendStatus(userResult);
        }
      });
    }
  });

});

// delete single user

router.delete('/user/delete/:id', function(req, res) {
  console.log('delete route');

  User.findOne({_id: req.params.id}, function(err, userResult) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      User.remove({_id: userResult._id}, function(err) {});
      res.sendStatus(200);
    }
  });
});// end delete route

module.exports = router;
