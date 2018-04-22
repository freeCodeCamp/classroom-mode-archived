// This is a module which helps us interact with the scraper
// It exposes one public function, 'fetchUserInfoFromFCC' that takes a github username and a callback function
// 'fetchUserInfoFromFCC' will call the callback function and pass in a success/failure flag into the callback.
// if successful, the results of the api call should also be included as second parameter into the callback

const request = require("request");

// @todo convert to promise
function fetchUserInfoFromFCC (githubName, callback) {
  request.get(`https://fcc-profile-scraper.herokuapp.com/user/${githubName}`, function(error, response, body) {

    if (error) {
      console.log(`Error: ${error}`);
      callback(true, { error });
      return;
    }

    if (response.statusCode != 200) {
      console.log(`Error: status code: ${response.statusCode}`);
      callback(true, { error: JSON.parse(body) });
      return;
    }

    let fccResults = JSON.parse(body);
    fccResults.daysInactive = computeDaysInactive(
      fccResults.completedChallenges
    );
    callback(false, fccResults);
  });
}

function findMostRecentCompletedChallenge(completedChallenges) {
  let mostRecentDate = new Date("Jan 1, 1980");

  for (let challenge of completedChallenges) {
    let completedDate = new Date(challenge.completed_at);
    let updatedDate = new Date(challenge.updated_at);
    let lastActiveDate = completedDate;
    if (updatedDate > completedDate) {
      lastActiveDate = updatedDate;
    }
    if (lastActiveDate > mostRecentDate) {
      mostRecentDate = lastActiveDate;
    }
  }

  return mostRecentDate;
}

function computeDaysInactive(completedChallenges) {
  if (completedChallenges.length == 0) {
    return "N/A";
  }

  let mostRecentDate = findMostRecentCompletedChallenge(completedChallenges);
  let currentDate = new Date();
  let daysInactive = (currentDate - mostRecentDate) / (1000 * 60 * 60 * 24);

  console.log(`Days Inactive: ${daysInactive}`);

  daysInactive = Math.floor(daysInactive);
  return daysInactive;
}

exports.fetchUserInfoFromFCC = fetchUserInfoFromFCC;
