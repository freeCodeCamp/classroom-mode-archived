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

describe('PUT /students', () => {
  beforeEach(done => {
    const student = new Student({
      name: 'studentName',
      email: 'user@freecodecamp.com',
      notes: 'oldStudentNote',
    })

    student.save(() => done())
  })

  it("should return 200 when email isn't modified", async () => {
    const student = await Student.findOne({ email: 'user@freecodecamp.com' })
    const res = await request(app)
      .put('/students')
      .send({
        email: 'user@freecodecamp.com',
        notes: 'oldStudentNote',
        studentId: student._id.toString(),
      })
    expect(res.statusCode).to.equal(200)
  })

  it('should return 200 when username is modified and valid', async () => {
    const email = 'newUser@freecodecamp.com'
    const apiResponseBody = { data: { getUser: { name: 'Student Name', email } } }
    const stubApiRequest = sandbox.stub(apiRequest, 'post')
    stubApiRequest.yields(false, {}, apiResponseBody)
    const student = await Student.findOne({ email: 'user@freecodecamp.com' })
    const res = await request(app)
      .put('/students')
      .send({
        email,
        notes: 'newStudentNotes',
        studentId: student._id.toString(),
      })
    expect(res.statusCode).to.equal(200)
  })

  it("should returns open api errors when api returns error", async () => {
    const email = 'not-valid@test.com'
    const apiResponseBody = { data: { getUser: null }, errors: [ { message: `No user found for ${email}` } ] }
    const stubApiRequest = sandbox.stub(apiRequest, 'post')
    stubApiRequest.yields(false, {}, apiResponseBody)
    const student = await Student.findOne({ email: 'user@freecodecamp.com' })
    const res = await request(app)
      .put('/students')
      .send({
        email,
        notes: 'newStudentNotes',
        studentId: student._id.toString(),
      })
    expect(res.statusCode).to.equal(422)
    const errorJSON = JSON.stringify({
      errors: [`No user found for ${email}`],
    })
    expect(res.body[0].message).to.include(
      `No user found for ${email}`
    )
  })
})
