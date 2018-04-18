var express = require('express');
var router = express.Router();
var db = require('../helpers/database_singleton').getDbInstance();
var scraper = require('../helpers/scraper');

router.get('/', function(req, res) {
  var numStudents = 0;
  var numResponsesReceived = 0;

  db.collection("students").find({}).toArray(function(err, students) {
    numStudents = students.length;
    if (numStudents === 0) {
      res.status(200).json(students);
    }
    students.forEach(function(student, index){
      scraper.fetchUserInfoFromFCC(student.username, function(_err, fccResults){
        student.daysInactive = fccResults.daysInactive;
        if (fccResults.completedChallenges) {
          let completedChallengesCount =
            student.completedChallengesCount ? student.completedChallengesCount : 0;
          student.newSubmissionsCount =
            fccResults.completedChallenges.length - completedChallengesCount;
        }
        numResponsesReceived++;
        if (numResponsesReceived >= numStudents) {
          res.status(200).json(students);
        }
      });
    });
  });
});

module.exports = router;
