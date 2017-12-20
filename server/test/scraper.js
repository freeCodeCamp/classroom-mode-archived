var should = require('chai').should(); 
var expect = require('chai').expect; 
var scraper = require('../routes/helpers/scraper'); 
var sinon = require('sinon');
var request = require('request');



it('should return an error if scraper has a non-200 status code', function(done) {
   var get = sinon.stub(request, "get");
   
   get.yieldsOn(this, null, {statusCode:400}, "{}");
   
   scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
       expect(err).to.equal(true); 
       expect(results.error).to.be.a('object'); 
       done(); 
   })
   get.restore(); 
});



it('should return no errors if scraper has a 200 status code', function(done) {
  var get = sinon.stub(request, "get");
   
   var testData = JSON.stringify({
      "name": "Utsab Saha",
      "profileImage": "https://avatars3.githubusercontent.com/u/6780322?v=4",
      "location": "San Francisco",
      "completedChallenges": [
         {
            "title": "Learn how Free Code Camp Works",
            "completed_at": "Jul 05, 2016",
            "updated_at": "",
            "url": "https://www.freecodecamp.com/challenges/Learn how Free Code Camp Works"
         },
         {
            "title": "Create a GitHub Account and Join our Chat Rooms",
            "completed_at": "Jul 06, 2016",
            "updated_at": "",
            "url": "https://www.freecodecamp.com/challenges/Create a GitHub Account and Join our Chat Rooms"
         },
         {
            "title": "Configure your Code Portfolio",
            "completed_at": "Jul 06, 2016",
            "updated_at": "",
            "url": "https://www.freecodecamp.com/challenges/Configure your Code Portfolio"
         }
         ]
      });
   
   get.yieldsOn(this, null, {statusCode:200}, testData);
   
   scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
       expect(err).to.equal(false); 
       done(); 
   })
   get.restore(); 
});

it('should compute correct number of inactive days', function(done) {
     
});



it('should compute correct number of inactive days when user has no history', function(done) {
     
});



it('should compute correct number of inactive days when user was active today', function(done) {
     
});
