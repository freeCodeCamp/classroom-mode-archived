var express = require('express');
var router = express.Router();
var db = require('./helpers/database_singleton').getDbInstance();


router.get('/', function(req, res) {
  db.collection("students").find({}).toArray(function(err, result) {
    res.status(200).json(result);
  })
});

module.exports = router;