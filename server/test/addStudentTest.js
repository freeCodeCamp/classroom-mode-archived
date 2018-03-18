var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../app');
var request = require('supertest');
var serverRequestToScraper = require('request');
var scraper = require('../routes/helpers/scraper');
var Student = require('../routes/helpers/studentSchema');

var sandbox = sinon.sandbox.create();

afterEach(function(){
   sandbox.restore();
});

describe('POST /add_student', () => {
  it('should return an error if student name is absent', (done) => {
    request(app)
      .post('/add_student')
      .expect(422)
      .end(function(_err, res){
        expect(JSON.parse(res.text).errors).to.include('Name is required.');
        expect(JSON.parse(res.text).errors).to.include('Email is required.');
        expect(JSON.parse(res.text).errors).to.include('Username is required.');
        done();
      });
  });

  it('should return an error if email in invalid', (done) => {
    request(app)
      .post('/add_student')
      .send({ email: 'userfreecodecampcom' })
      .expect(422)
      .end(function(_err, res){
        console.log(res.text);
        expect(JSON.parse(res.text).errors).to.include('Email is invalid.');
        done();
      });
  });

  it('should receive an error message if scraper returns error,', (done) => {
    var fetchUserInfoFromFCC = sandbox.stub(scraper, "fetchUserInfoFromFCC");
    fetchUserInfoFromFCC.yieldsOn(true, "{}");

    request(app)
      .post('/add_student')
      .send({ name: 'fccStudent', email: 'user@freecodecamp.com', username: 'invalidUsername' })
      .expect(422)
      .end(function(_err, res){
        console.log(res.text);
        expect(JSON.parse(res.text).errors).to.include('freeCodeCamp username is invalid.');
        done();
      });
  });

  it('should call the mongoose save method when all fields are valid', (done) => {
    var fetchUserInfoFromFCC = sandbox.stub(scraper, "fetchUserInfoFromFCC");
    fetchUserInfoFromFCC.yieldsOn(false, "{}");
    let save = sandbox.stub(Student.prototype, "save");
    save.callsFake(function fakeFn(callback) {
      callback();
    });

    request(app)
      .post('/add_student')
      .send({ name: 'fccStudent', email: 'user@freecodecamp.com', username: 'anyusername' })
      .expect(200)
      .end(function(_err, res){
        console.log(res.text);
        expect(save.calledOnce);
        done();
      });
  });

  it('should not call the mongoose save method username is invalid', (done) => {
    var fetchUserInfoFromFCC = sandbox.stub(scraper, "fetchUserInfoFromFCC");
    fetchUserInfoFromFCC.yieldsOn(true, "{}");
    let save = sandbox.stub(Student.prototype, "save");
    save.callsFake(function fakeFn(callback) {
      callback();
    });

    request(app)
      .post('/add_student')
      .send({ name: 'fccStudent', email: 'user@freecodecamp.com', username: 'invalidusername' })
      .expect(422)
      .end(function(_err, res){
        expect(JSON.parse(res.text).errors).to.include("freeCodeCamp username is invalid.");
        expect(save.notCalled);
        done();
      });
  });

  it('should save completedChallengesCount and completedChallengesTitle when saving students', (done) => {
    let student = {
      "_id": "5a9f752384675412f4cac45b",
      "name": "tom",
      "username": "user512",
      "email": "user@freecodecamp.com",
      "notes": "",
      "__v": 0,
      "daysInactive": 3,
      "completedChallengesCount": 2,
      "completedChallenges": [
        {
          "title": "Build a Tribute Page",
          "completed_at": "Apr 02, 2017",
          "updated_at": "",
          "url": "https://www.freecodecamp.com/challenges/Build a Tribute Page"
        },
        {
          "title": "Reverse a String",
          "completed_at": "May 13, 2017",
          "updated_at": "",
          "url": "https://www.freecodecamp.comundefined"
        }
      ]
    };

    let save = sandbox.stub(Student.prototype, "save");
    save.callsFake(function fakeFn(callback) {
      callback();
    });

    var fetchUserInfoFromFCC = sandbox.stub(scraper, "fetchUserInfoFromFCC");
    fetchUserInfoFromFCC.yieldsOn(false, student);

    request(app)
      .post('/add_student')
      .send({ name: 'tom', email: 'user@freecodecamp.com', username: 'user512' })
      .expect(200)
      .end(function(_err, res){
        expect(save.calledOnce);
        done();
      });
  });
});

