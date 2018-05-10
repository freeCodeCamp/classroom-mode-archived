require('dotenv').config({ path: 'variables.env' })
const mongoose = require('mongoose')
const Student = require('../models/Student')
const chai = require('chai')

const expect = chai.expect
const sinon = require('sinon')
const request = require('supertest')
const scraper = require('../helpers/scraper')
const app = require('../app')

chai.use(require('sinon-chai'))

const sandbox = sinon.sandbox.create()

afterEach(() => {
  sandbox.restore()
})

describe('GET /students', () => {
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

  afterEach(async () => {
    const db = mongoose.connection
    db.dropDatabase()
  })

  // server/test/database.js drops students after each test

  function stubScraper(error, scraperResponse) {
    sandbox
      .stub(scraper, 'fetchUserInfoFromFCC')
      .yieldsAsync(error, scraperResponse)
  }

  it('should return 200', done => {
    stubScraper(false, { daysInactive: 1 })
    request(app)
      .get('/students')
      .end((_err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('should returns student info', done => {
    stubScraper(false, { daysInactive: 1 })
    request(app)
      .get('/students')
      .end((_err, res) => {
        expect(JSON.parse(res.text)[0].name).to.equal('studentName')
        expect(JSON.parse(res.text)[0].username).to.equal('user512')
        expect(JSON.parse(res.text)[0].email).to.equal('test@example.com')
        expect(JSON.parse(res.text)[0].notes).to.equal('studentNote')
        expect(JSON.parse(res.text)[0].daysInactive).to.equal(1)
        done()
      })
  })

  it('should return a 200 and an empty array if the database is empty', done => {
    const db = mongoose.connection
    db.dropDatabase(() => {
      request(app)
        .get('/students')
        .end((_err, res) => {
          expect(res.status).to.equal(200)
          expect(JSON.parse(res.text)).to.be.an('array').that.is.empty
          done()
        })
    })
  })

  it('should returns new submissions count and titles', done => {
    stubScraper(false, {
      completedChallenges: [
        { title: 'Reverse a String' },
        { title: 'Say Hello to HTML Elements' },
      ],
    })
    request(app)
      .get('/students')
      .end((_err, res) => {
        expect(JSON.parse(res.text)[0].newSubmissionsCount).to.equal(1)
        done()
    })
  })

  describe('when student completedChallengeCount is undefinded', () => {
    it('should returns new submissions count', done => {
      const student = new Student({
        name: 'studentName',
        username: 'user512',
        email: 'test@example.com',
        notes: 'studentNote',
        completedChallengesCount: 0,
        completedChallenges: [],
      })

      stubScraper(false, {
        completedChallenges: [
          { title: 'Reverse a String' },
          { title: 'Say Hello to HTML Elements' },
        ],
      })

      const db = mongoose.connection
      db.dropDatabase(() => {
        student.save(() => {
          request(app)
            .get('/students')
            .end((_err, res) => {
              expect(JSON.parse(res.text)[0].newSubmissionsCount).to.equal(2)
              done()
          })
        })
      })
    })
  })
})
