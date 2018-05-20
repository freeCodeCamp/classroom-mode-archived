require('dotenv').config({ path: 'variables.env' })
const Student = require('../../../models/Student')
const chai = require('chai')
const expect = require('chai').expect
const sinon = require('sinon')
const request = require('supertest')
const serverRequestToScraper = require('request')
const scraper = require('../../../helpers/scraper')
const assert = require('assert')
const app = require('../../../app')

const sandbox = sinon.sandbox.create()

afterEach(() => {
  sandbox.restore()
})

describe('PUT /students', () => {
  beforeEach(done => {
    const student = new Student({
      name: 'studentName',
      username: 'user512',
      email: 'test@example.com',
      notes: 'studentNote',
      completedChallengesCount: 1,
      completedChallenges: [{}],
    })

    student.save(() => done())
  })

  const stubScraper = (error, scraperResponse) => {
    sandbox
      .stub(scraper, 'fetchUserInfoFromFCC')
      .yieldsAsync(error, scraperResponse)
  }

  const noScraperErrorResponse = {
    completedChallenges: [
      {
        solution: 'some code',
      },
      {
        solution: 'some code',
      },
    ],
    dayInactive: 5,
  }

  it("should return 200 when username isn't modified", async () => {
    const student = await Student.findOne({ username: 'user512' })
    stubScraper(false, {})
    const res = await request(app)
      .put('/students')
      .send({
        name: 'fccStudent',
        email: 'user@freecodecamp.com',
        username: 'user512',
        studentId: student._id.toString(),
      })
    expect(res.statusCode).to.equal(200)
  })

  it('should return 200 when username is modified', async () => {
    const student = await Student.findOne({ username: 'user512' })
    stubScraper(false, noScraperErrorResponse)
    const res = await request(app)
      .put('/students')
      .send({
        name: 'fccStudent',
        email: 'user@freecodecamp.com',
        username: 'updatedser512',
        studentId: student._id.toString(),
      })
    expect(res.statusCode).to.equal(200)
  })

  it("should returns 'Error fetching user from FreeCodeCamp' when scraper returns error", async () => {
    const student = await Student.findOne({ username: 'user512' })
    stubScraper(true, {})
    const res = await request(app)
      .put('/students')
      .send({
        name: 'fccStudent',
        email: 'user@freecodecamp.com',
        username: 'updatedser512',
        studentId: student._id.toString(),
      })
    expect(res.statusCode).to.equal(500)
    const errorJSON = JSON.stringify({
      errors: ['Error fetching user from FreeCodeCamp'],
    })
    expect(res.text).to.equal(errorJSON)
  })
})
