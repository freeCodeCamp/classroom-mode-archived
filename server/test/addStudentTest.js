require('../models/Student');


const expect = require('chai').expect;
const sinon = require('sinon');
const app = require('../app');
const request = require('supertest');
const serverRequestToScraper = require('request');
const scraper = require('../helpers/scraper');
const sandbox = sinon.sandbox.create();

afterEach(function() {
  sandbox.restore();
});

describe('POST /add_student', () => {
  it('should return an error if student name is absent', done => {
    request(app)
      .post('/add_student')
      .end(function(_err, res) {
        expect(res.statusCode).to.equal(422);
        expect(JSON.parse(res.text).errors).to.include('Name is required.');
        expect(JSON.parse(res.text).errors).to.include('Email is required.');
        expect(JSON.parse(res.text).errors).to.include('Username is required.');
        done();
      });
  });

  it('should return an error if email in invalid', done => {
    request(app)
      .post('/add_student')
      .send({ email: 'userfreecodecampcom' })
      .end(function(_err, res) {
        expect(res.statusCode).to.equal(422);
        expect(JSON.parse(res.text).errors).to.include('Email is invalid.');
        done();
      });
  });

  it('should receive an error message if scraper returns error,', done => {
    var fetchUserInfoFromFCC = sandbox.stub(scraper, 'fetchUserInfoFromFCC');
    fetchUserInfoFromFCC.yields(true, '{}');

    request(app)
      .post('/add_student')
      .send({
        name: 'fccStudent',
        email: 'user@freecodecamp.com',
        username: 'invalidUsername'
      })
      .end(function(_err, res) {
        expect(res.statusCode).to.equal(422);
        expect(JSON.parse(res.text).errors).to.include(
          'freeCodeCamp username is invalid.'
        );
        done();
      });
  });

  it('should call the mongoose save method when all fields are valid', done => {
    var fetchUserInfoFromFCC = sandbox.stub(scraper, 'fetchUserInfoFromFCC');
    fetchUserInfoFromFCC.yields(false, '{}');
    let save = sandbox.stub(Student.prototype, 'save');
    save.yields(false);

    request(app)
      .post('/add_student')
      .send({
        name: 'fccStudent',
        email: 'user@freecodecamp.com',
        username: 'anyusername'
      })
      .end(function(_err, res) {
        expect(res.statusCode).to.equal(200);
        expect(save).to.have.been.calledOnce;
        done();
      });
  });

  it('should not call the mongoose save method when username is invalid', done => {
    var fetchUserInfoFromFCC = sandbox.stub(scraper, 'fetchUserInfoFromFCC');
    fetchUserInfoFromFCC.yields(true, '{}');
    let save = sandbox.stub(Student.prototype, 'save');
    save.yields(false);

    request(app)
      .post('/add_student')
      .send({
        name: 'fccStudent',
        email: 'user@freecodecamp.com',
        username: 'invalidusername'
      })
      .end(function(_err, res) {
        expect(res.statusCode).to.equal(422);
        expect(JSON.parse(res.text).errors).to.include(
          'freeCodeCamp username is invalid.'
        );
        expect(save).to.not.have.been.called;
        done();
      });
  });

  // FIXME: Intended to test if we were able to save completedChallengesCount and completedChallengesTitle
  // to db but unit test might not serve the purpose
  xit('should save completedChallengesCount and completedChallengesTitle when saving students', done => {
    let student = {
      _id: '5a9f752384675412f4cac45b',
      name: 'tom',
      username: 'user512',
      email: 'user@freecodecamp.com',
      notes: '',
      __v: 0,
      daysInactive: 3,
      completedChallengesCount: 2,
      completedChallenges: [
        {
          title: 'Build a Tribute Page',
          completed_at: 'Apr 02, 2017',
          updated_at: '',
          url: 'https://www.freecodecamp.com/challenges/Build a Tribute Page'
        },
        {
          title: 'Reverse a String',
          completed_at: 'May 13, 2017',
          updated_at: '',
          url: 'https://www.freecodecamp.comundefined'
        }
      ]
    };

    var fetchUserInfoFromFCC = sandbox.stub(scraper, 'fetchUserInfoFromFCC');
    fetchUserInfoFromFCC.yields(false, student);
    let save = sandbox.stub(Student.prototype, 'save');
    save.yields(false);

    var StudentClass = (exports.Student = Student);
    var studentConstructor = sinon.spy(exports, 'Student');

    request(app)
      .post('/add_student')
      .send({
        name: 'tom',
        email: 'user@freecodecamp.com',
        username: 'user512'
      })
      .end(function(_err, res) {
        expect(res.statusCode).to.equal(200);
        expect(studentConstructor.called).to.equal(true);
        expect(save).to.have.been.calledOnce;
        done();
      });
  });
});
