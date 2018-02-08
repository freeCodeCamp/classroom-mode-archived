var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../app');
var request = require('supertest');

describe('GET /students', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/students')
      .end(function(_err, res) {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
// 1. it should make the appropriate request
// to the server on page load
// 2 GET request to /students endpoint should 
// return a 200
// 3. On GET request, fetch data
// from mongoDB
// 4.  mock the fetch data from MongoDB ==> 
// return the data as json to the front-end
// 5.  Nice to have ==> pagination.
// 6. Test the empty case.  There are no entries 
// in the database.  /students endpoint should
// return an empty array.  Client should show
// a user-friendly message in the UI.