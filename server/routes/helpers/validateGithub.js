var request = require('request');


function validateGithubUsername(usrName, handleResult) {
	
	var uri = 'http://fcc-profile-scraper.herokuapp.com/user/' + usrName; 
	
	request(uri, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      
      var statusCode = response && response.statusCode; 
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      
      if (statusCode == 200) {
          handleResult(true); 
      } else {
          handleResult(false);
      }
});

}


module.exports = validateGithubUsername; 