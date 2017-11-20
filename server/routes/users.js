var express = require('express');
var router = express.Router();
var request = require('request');



const fccBaseUrl = 'https://fcc-profile-scraper.herokuapp.com/user/';



/* GET users listing. */
router.get('/:userId', function(req, res, next) {
//   res.send('respond with a resource');

     console.log("params: ");
     console.log(req.params);
     let githubName = req.params.userId; 
     
     request(fccBaseUrl + githubName, function (error, response, body){
          console.log("Received scraper response"); 
          
          if (error) {
               // throw error;
               // reject();
               console.log("Error: " + error); 
          }
         
          body = JSON.parse(body);
          res.json(body); 
     }); 
});

module.exports = router;
