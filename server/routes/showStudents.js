var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendStatus(200);
});

module.exports = router;