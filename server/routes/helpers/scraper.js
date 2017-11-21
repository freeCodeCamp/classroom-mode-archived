// This is a module which helps us interact with the scraper
// It exposes one public function, 'fetchUserInfoFromFCC' that takes a github username and a callback function
// 'fetchUserInfoFromFCC' will call the callback function and pass in a success/failure flag into the callback.  
//     if successful, the results of the api call should also be included as second parameter into the callback
var request = require('request');

const fccBaseUrl = 'https://fcc-profile-scraper.herokuapp.com/user/';


function fetchUserInfoFromFCC(githubName, callback) {
    request(fccBaseUrl + githubName, function (error, response, body){
          console.log("Received scraper response"); 
          
          if (error) {
               console.log("Error: " + error); 
               callback(true, {error: error}); 
               return; 
          }
          
          if (response.statusCode != 200) {
               console.log("Error: status code: " + response.statusCode); 
               callback(true, {error: JSON.parse(body)}); 
               return; 
          }
    
          var fccResults = JSON.parse(body);
          fccResults.daysInactive = computeDaysInactive(fccResults.completedChallenges);
          callback(null, fccResults); 
     }); 
}

function findMostRecentCompletedChallenge(completedChallenges) {
    var mostRecentDate = new Date ("Jan 1, 1980"); 
    
    for (var challenge of completedChallenges) {
        var completedDate = new Date(challenge.completed_at); 
        if (completedDate > mostRecentDate) {
            mostRecentDate = completedDate;
        }
    }
    
    return mostRecentDate; 
}

function computeDaysInactive(completedChallenges) {
    var mostRecentDate = findMostRecentCompletedChallenge(completedChallenges); 
    var currentDate = new Date(); 
    var daysInactive = (currentDate - mostRecentDate) / (1000 * 60 * 60 * 24); 
    daysInactive = Math.floor(daysInactive); 
    return daysInactive; 
}

exports.fetchUserInfoFromFCC = fetchUserInfoFromFCC;