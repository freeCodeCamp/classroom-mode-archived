var express = require('express');
var router = express.Router();
var request = require('request');
var databaseModule = require('./helpers/database_singleton');
var db = databaseModule.getDbInstance();
var Student = require('./helpers/studentSchema');

router.post('/', function(req, res) {
    var student = new Student({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        notes: req.body.notes
    })

    student.save(function(err, fluffy) {
        if (err) return console.error(err);
        console.log(student);
    })
})

module.exports = router;