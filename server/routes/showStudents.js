var express = require('express');
var router = express.Router();
var db = require('./helpers/database_singleton').getDbInstance(); 


router.get('/', function(req, res) {
  res.sendStatus(200);
});

module.exports = router;