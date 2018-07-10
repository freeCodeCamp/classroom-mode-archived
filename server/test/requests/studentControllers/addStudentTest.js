require('dotenv').config({ path: 'variables.env' })
const Student = require('../../../models/Student')
const expect = require('chai').expect
const request = require('supertest')
const sinon = require('sinon')
const apiRequest = require('request')
const app = require('../../../app')

const sandbox = sinon.sandbox.create()

afterEach(() => {
  sandbox.restore()
})

describe('POST /students', () => {
  it('should return an error if student name is absent', async () => {
      const res = await request(app)
        .post('/students')

      expect(res.statusCode).to.equal(422)
      expect(JSON.parse(res.text).errors).to.include('Email is required.')
  })

  it('should return an error if email in invalid', async () => {
    const res = await request(app)
        .post('/students')
        .send({ email: 'userfreecodecampcom' })

    expect(res.statusCode).to.equal(422)
    expect(JSON.parse(res.text).errors).to.include('Email is invalid.')
  })

  it('should create a student when valid email', async () => {
    const email = 'user@freecodecamp.com'
    const apiResponseBody = { data: { getUser: { name: 'Student Name', email } } }
    const stubApiRequest = sandbox.stub(apiRequest, 'post')
    stubApiRequest.yields(false, {}, apiResponseBody)
    const save = sandbox.stub(Student.prototype, 'save')
    save.yields(false)

    const res = await request(app)
      .post('/students')
      .send({ email })

    expect(res.statusCode).to.equal(200)
    expect(save).to.have.been.calledOnce
  })

  it('should receive an error message and do not save student if open-api returns error', async () => {
    const email = 'not-valid@test.com'
    const apiResponseBody = { data: { getUser: null }, errors: [ { message: `No user found for ${email}` } ] }
    const stubApiRequest = sandbox.stub(apiRequest, 'post')
    stubApiRequest.yields(false, {}, apiResponseBody)
    const save = sandbox.stub(Student.prototype, 'save')
    save.yields(false)

    const res = await request(app)
    .post('/students')
    .send({ email })

    expect(res.statusCode).to.equal(422)
    expect(JSON.parse(res.text).errors).to.include(
      'No user found for not-valid@test.com'
    )
    expect(save).to.not.have.been.called
  })
})
