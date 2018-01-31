var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../app');
var request = require('supertest');
var validateGithubUsername = require('../routes/helpers/validateGithub');


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

  it('should return an error if fcc username is invalid', (done) => {
    // var sandbox = sinon.sandbox.create();
    // var mockValidateUsername = sandbox.stub(validateGithubUsername, 'validateGithubUsername');
  
    
    sinon.stub(validateGithubUsername, 'validateGithubUsername')
         .callsFake(function fakeFn(username, callback) {
      console.log("***********");
      console.log(username);
      return false;
    });

    request(app)
      .post('/add_student')
      .send({ name: 'fccStudent', email: 'user@freecodecamp.com', username: 'invalidUsername' })
      .expect(422)
      .end(function(_err, res){
        console.log(res.text);
        expect(JSON.parse(res.text).errors).to.include('freeCodeCamp username is invalid.');
        done();
      });
  })
});


// describe addStudent endpoint
//   it should takes student name, email, fCC username, and note and return 200
//   it should takes student name, email, fCC username, and note and save student
//             ===> mongoose.save function gets called with name, email, fcc username, and the note
//   when name is absent
//     it returns 422 and student is not saved
//     it returns jsons name is required
    
//   when email is absent
//     it returns 422 and student is not saved
//     it returns jsons email is required
    
//   when freeCodeCampUsername is absent
//     it returns 422 and student is not saved
//     it returns jsons freeCodeCampUsername is required
    
//   when email is invalid
//     it returns 422 and student is not saved
//     it returns jsons email is invalid
    
//   when freeCodeCampUsername is invalid
//     it returns 422 and student is not saved
//     it returns jsons freeCodeCamp is invalid
    
    