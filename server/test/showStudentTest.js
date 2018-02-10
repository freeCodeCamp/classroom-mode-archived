var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../app');
var request = require('supertest');
var db = require('../routes/helpers/database_singleton').getDbInstance();


describe('GET /students', () => {

  var dummyStudentResults = [{ _id: "5a28cd1b1805592081cd31ea",
  name: 'studentName',
  username: 'studentUserName',
  email: 'studentEmail',
  notes: 'studentNote',
  __v: 0 }];

  sinon.stub(db, "collection").returns({
    find: function() {
      return {
        toArray: function(cb) {
          cb(null, dummyStudentResults);
        }
      };
    }
  });

  it('should return 200', (done) => {
    request(app)
      .get('/students')
      .end(function(_err, res) {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should fetch data from mongo DB', (done) => {
    request(app).get("/students").end(function(_err, res) {
      expect(JSON.parse(res.text)[0].name).to.equal(dummyStudentResults[0].name);
      expect(JSON.parse(res.text)[0].username).to.equal(dummyStudentResults[0].username);
      expect(JSON.parse(res.text)[0].email).to.equal(dummyStudentResults[0].email);
      expect(JSON.parse(res.text)[0].notes).to.equal(dummyStudentResults[0].notes);
      done();
    })
  });

});

// db.collection(‘students’).find({});  //returns JSON

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