var expect = require('chai').expect;
var sinon = require('sinon');
var app = require('../app');
var request = require('supertest');


describe('POST /add_student', () => {
  it('should return an error if student name is absent', (done) => {
    request(app).post('/add_student').expect(422, done);
  });
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
    
    