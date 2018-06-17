require('dotenv').config({ path: 'variables.env' })
const Student = require('../../../models/Student')
const expect = require('chai').expect
const sinon = require('sinon')
const request = require('supertest')
const apiRequest = require('request')
const scraper = require('../../../helpers/scraper')
const assert = require('assert')
const app = require('../../../app')

const sandbox = sinon.sandbox.create()

afterEach(() => {
  sandbox.restore()
})

describe('POST /students', () => {
  beforeEach(async () => {
    Student.create({
      name: 'Quincy Larson',
      email: 'whoknows@freecodecamp.com',
      username: 'quincylarson',
    })
  })

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
    }
  })

  it('should receive an error message if open-api returns error', done => {
    try {
      const stubApiRequest = sandbox.stub(apiRequest, 'post')
      const apiResponseBody =  { data: { getUser: null },
                                  errors:
                                  [ { message: 'No user found for not-valid@test.com',
                                      locations: [Array],
                                      path: [Array] } ] }
      stubApiRequest.yields(false, {}, apiResponseBody)

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
        `Error! should receive an error message if scraper returns error: ${e}`
      )
    }
  })

  xit('should find a Student by username', done => {
    const fetchUserInfoFromFCC = sandbox.stub(scraper, 'fetchUserInfoFromFCC')
    fetchUserInfoFromFCC.yields(true, '{}')
    Student.findOne({ username: 'quincylarson' }).then(foundStudent => {
      assert(foundStudent.email === 'whoknows@freecodecamp.com')
      done()
    })
  })

  it('should not call the mongoose save method when email is invalid', done => {
    try {
      const stubApiRequest = sandbox.stub(apiRequest, 'post')
      const apiResponseBody =  { data: { getUser: null },
                                  errors:
                                  [ { message: 'No user found for not-valid@test.com',
                                      locations: [Array],
                                      path: [Array] } ] }
      stubApiRequest.yields(false, {}, apiResponseBody)
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
    }
  })
})
