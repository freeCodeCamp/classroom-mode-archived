var express = require('express');
var router = express.Router();
var request = require('request');
var scraper = require('./helpers/scraper'); 
var mongoose = require('mongoose');
var DB_URI = process.env.DATABASE_URI || require('../config/secret').DATABASE_URI; 

// PLan: create a file: secret.js.  Don't commit this to github
console.log("DB_URI: " + DB_URI); 

mongoose.connect(DB_URI);



/* GET users listing. */
router.get('/:userId', function(req, res, next) {
//   res.send('respond with a resource');

     console.log("params: ");
     console.log(req.params);
     let githubName = req.params.userId; 
     
     scraper.fetchUserInfoFromFCC(githubName, function(err, results) {
          if (err) {
               console.log(results); 
          }
         
          res.json(results); 
     });
});

module.exports = router;
