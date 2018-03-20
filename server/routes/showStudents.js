var express = require('express');
var router = express.Router();
var db = require('./helpers/database_singleton').getDbInstance();
var scraper = require('./helpers/scraper');

router.get('/', function(req, res) {
  console.log("test");
  var numStudents = 0;
  var numResponsesReceived = 0;
  db.collection("students").find({}).toArray(function(err, result) {
    numStudents = result.length;
    if (numStudents === 0) {
      res.status(200).json(result);
    }
    result.forEach(function(item, index){
      scraper.fetchUserInfoFromFCC(item.username, function(_err, fccResults){
        item.daysInactive = fccResults.daysInactive;
        numResponsesReceived++;
        if (numResponsesReceived >= numStudents) {
          res.status(200).json(result);
        }
      });
    });
  });
});

module.exports = router;
