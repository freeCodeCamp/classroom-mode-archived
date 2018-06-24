require('dotenv').config({ path: 'variables.env' })
const Student = require('../../../models/Student')
const expect = require('chai').expect
const sinon = require('sinon')
const request = require('supertest')
const apiRequest = require('request')
const app = require('../../../app')

const sandbox = sinon.sandbox.create()

afterEach(() => {
  sandbox.restore()
})

// TODO: Extract this into a stub helper
function stubGetStudentApiRequest(email = 'user@freecodecamp.com', valid = true) {
  const sandbox = sinon.sandbox.create()
  const apiResponseBody = valid ?
    { data: { getUser: { name: 'Student Name', email } } } :
    { data: { getUser: null }, errors: [ { message: `No user found for ${email}` } ] }

  const stubApiRequest = sandbox.stub(apiRequest, 'post')
  stubApiRequest.yields(false, {}, apiResponseBody)
}

describe('POST /students', () => {
  it('should return an error if student name is absent', done => {
    try {
      request(app)
        .post('/students')
        .end((_err, res) => {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include('Email is required.')
          done()
        })
    } catch (e) {
      console.log(
        `Error! should return an error if student name is absent: ${e}`
      )
      done()
    }
  })

  it('should return an error if email in invalid', done => {
    try {
      request(app)
        .post('/students')
        .send({ email: 'userfreecodecampcom' })
        .end((_err, res) => {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include('Email is invalid.')
          done()
        })
    } catch (e) {
      console.log(`Error! should return an error if email in invalid ${e}`)
      done()
    }
  })

  it('should create a student when valid email', done => {
    stubGetStudentApiRequest('user@freecodecamp.com', true)
    const save = sandbox.stub(Student.prototype, 'save')
    save.yields(false)

    request(app)
      .post('/students')
      .send({
        email: 'user@freecodecamp.com',
      })
      .end((_err, res) => {
        expect(res.statusCode).to.equal(200)
        expect(save).to.have.been.calledOnce
        done()
      })
  })

  it('should receive an error message if open-api returns error', done => {
    try {
      stubGetStudentApiRequest('not-valid@test.com', false)

      request(app)
        .post('/students')
        .send({
          email: 'not-valid@test.com',
        })
        .end((_err, res) => {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include(
            'No user found for not-valid@test.com'
          )
          done()
        })
    } catch (e) {
      console.log(
        `Error! should receive an error message if open api returns error: ${e}`
      )
      done()
    }
  })

  it('should not call the mongoose save method when email is invalid', done => {
    try {
      stubGetStudentApiRequest('not-valid@test.com', false)
      const save = sandbox.stub(Student.prototype, 'save')
      save.yields(false)

      request(app)
        .post('/students')
        .send({
          email: 'not-valid@test.com',
        })
        .end((_err, res) => {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include(
            'No user found for not-valid@test.com'
          )
          expect(save).to.not.have.been.called
          done()
        })
    } catch (e) {
      console.log(
        `Error! should not call the mongoose save method when username is invalid: ${e}`
      )
      done()
    }
  })
})
