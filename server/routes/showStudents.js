var express = require('express');
var router = express.Router();
var db = require('./helpers/database_singleton').getDbInstance();
var scraper = require('./helpers/scraper');


router.get('/', function(req, res) {
  db.collection("students").find({}).toArray(function(err, result) {
    result.forEach(function(item, index){
      scraper.fetchUserInfoFromFCC(item.username, function(_err, fccResults){
        item.daysInactive = fccResults.daysInactive;
      });
    });
    res.status(200).json(result);
  });
});

module.exports = router;
