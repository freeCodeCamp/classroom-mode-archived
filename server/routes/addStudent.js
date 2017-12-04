var express = require('express');
var router = express.Router();
var request = require('request');
var databaseModule = require('./helpers/database_singleton');
var db = databaseModule.getDbInstance();

router.post('/', function(req, res) {
    console.log('hitting server');
    console.log(req.body);
})

module.exports = router;