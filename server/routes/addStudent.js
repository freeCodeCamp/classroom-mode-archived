var express = require('express');
var router = express.Router();
var request = require('request');
var databaseModule = require('./helpers/database_singleton');
var db = databaseModule.getDbInstance();
var Student = require('./helpers/studentSchema');

router.post('/', function(req, res) {
    var errors = []; 
    
    if (!req.body.name) {
        errors.push("Name is required."); 
    }
    
    if (!req.body.username) {
        errors.push("Username is required."); 
    }
    
    if (!req.body.email) {
        errors.push("Email is required."); 
    }
    
    var student = new Student({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        notes: req.body.notes
    });

    student.save(function(err, fluffy) {
        if (err) {return console.error(err)};
        console.log(student);
    
        res.json({'errors': errors});
    });
    
     
})

module.exports = router;