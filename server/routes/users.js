var express = require('express');
var router = express.Router();
var request = require('request');
var scraper = require('./helpers/scraper'); 




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
