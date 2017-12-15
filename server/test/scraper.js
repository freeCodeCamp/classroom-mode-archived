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
  
});

it('should compute correct number of inactive days', function(done) {
     
});



it('should compute correct number of inactive days when user has no history', function(done) {
     
});



it('should compute correct number of inactive days when user was active today', function(done) {
     
});
