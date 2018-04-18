const scraper = require("../helpers/scraper");
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

exports.showStudent = (req, res) => {
  let numStudents = 0;
  let numResponsesReceived = 0;

  Student
    .find({})
    .then(students => {
        numStudents = students.length;
        if(numStudents === 0) {
            res.status(200).json(students);
        }
        students.forEach(function(student, index) {
            scraper.fetchUserInfoFromFCC(student.username, function(
                _err,
                fccResults
            ) {
                student.daysInactive = fccResults.daysInactive;
                if (fccResults.completedChallenges) {
                let completedChallengesCount = student.completedChallengesCount
                    ? student.completedChallengesCount
                    : 0;
                student.newSubmissionsCount =
                    fccResults.completedChallenges.length - completedChallengesCount;
                }
                numResponsesReceived++;
                if (numResponsesReceived >= numStudents) {
                res.status(200).json(students);
                }
            });
        });
    })
};

exports.addStudent = (req, res) => {
  let errors = [];
  let { name, email, username, notes} = req.body

  if (!name) {
    errors.push("Name is required.");
  }

  if (!username) {
    errors.push("Username is required.");
  }

  let emailValidationError = validateEmail(email);

  if (emailValidationError) {
    errors.push(emailValidationError);
  }

  if (errors.length > 0) {
    res.status(422).json({ errors });
    return;
  }

  scraper.fetchUserInfoFromFCC(username, function(error, fccResults) {
    if (!error) {
      let student = new Student({
        name,
        username,
        email,
        notes,
        completedChallengesCount:
          fccResults.completedChallenges &&
          fccResults.completedChallenges.length,
        completedChallenges: fccResults.completedChallenges
      });
      student.save(function(err) {
        if (err) {
          console.log("Student saved failed", student);
          res.sendStatus(500);
        }
        console.log(student);
        res.sendStatus(200);
      });
    } else {
      errors.push("freeCodeCamp username is invalid.");
      res.status(422).json({ errors: errors });
    }
  });
};
