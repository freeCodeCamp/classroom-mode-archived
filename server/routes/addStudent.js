var express = require('express');
var router = express.Router();
var databaseModule = require('./helpers/database_singleton');
var Student = require('./helpers/studentSchema');
var validateGithubUsername = require('./helpers/validateGithub').validateGithubUsername;

router.post('/', function(req, res) {
    console.log('in actual code');
    var errors = [];

    if (!req.body.name) {
        errors.push("Name is required.");
    }

    if (!req.body.username) {
        errors.push("Username is required.");
    }

    let email = req.body.email;
    let emailValidationError = validateEmail(email);

    if (emailValidationError) {
        errors.push(emailValidationError);
    }

    if (errors.length > 0) {
        res.status(422).json({'errors': errors});
        return;
    }

    var student = new Student({
        name: req.body.name,
        username: req.body.username,
        email: email,
        notes: req.body.notes
    });

    validateGithubUsername(req.body.username, function(isValid) {
      if (isValid === true) {
        student.save(function(err, fluffy) {
          if (err) return console.error(err);
          console.log(student);
          res.sendStatus(200);
        });
      } else {
        errors.push('freeCodeCamp username is invalid.');
        res.status(422).json({'errors': errors});
      }
    });
});

router.post('/check', function(req, res) {
  var username = req.body.username;
  var email = req.body.email;

  Student.findOne({$or: [{'username': username}, {'email':email}]},
    function(err, Student) {
      if (err)
        return console.error(err);
      if (Student) {
        return res
                .status(401)
                .json({'errors': ['This student is already added']});
      } else {
        res.sendStatus(200);
      }
    }
  );
});

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    if (email && !re.test(email)) {
        return "Email is invalid.";
    } else if (!email) {
        return "Email is required.";
    }
}

module.exports = router;
