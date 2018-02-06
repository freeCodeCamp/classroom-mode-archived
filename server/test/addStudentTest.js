var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../app');
var request = require('supertest');
var serverRequestToScraper = require('request');
var validateHelper = require('../routes/helpers/validateGithub');
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

  it('should receive an error message if scraper returns a non-200 response,', (done) => {
 
    var get = sandbox.stub(serverRequestToScraper, "get");
   
    get.yieldsOn(this, null, {statusCode:404}, "{}");
   
    

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
 
    var get = sandbox.stub(serverRequestToScraper, "get");
    get.yieldsOn(this, null, {statusCode: 200}, "{}");
    
    var save = sandbox.stub(Student.prototype, "save");
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
 
    var get = sandbox.stub(serverRequestToScraper, "get");
    get.yieldsOn(this, null, {statusCode: 404}, "{}");
    
    var save = sandbox.stub(Student.prototype, "save");
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
});

