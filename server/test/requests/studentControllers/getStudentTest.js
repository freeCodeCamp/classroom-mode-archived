require('dotenv').config({ path: 'variables.env' })
const mongoose = require('mongoose')
const Student = require('../../../models/Student')
const chai = require('chai')

const expect = chai.expect
const sinon = require('sinon')
const request = require('supertest')
const app = require('../../../app')

chai.use(require('sinon-chai'))

const sandbox = sinon.sandbox.create()

afterEach(() => {
  sandbox.restore()
})

describe('GET /students', () => {
  beforeEach(done => {
    const student = new Student({
      name: 'Jason',
      email: 'jason@example.com',
      notes: 'studentNote',
    })

    student.save(() => done())
  })

  afterEach(async () => {
    const db = mongoose.connection
    db.dropDatabase()
  })

  // server/test/database.js drops students after each test

  it('should return 200', done => {
    request(app)
      .get('/students')
      .end((_err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('should returns student info', done => {
    request(app)
      .get('/students')
      .end((_err, res) => {
        expect(JSON.parse(res.text)[0].name).to.equal('Jason')
        expect(JSON.parse(res.text)[0].email).to.equal('jason@example.com')
        expect(JSON.parse(res.text)[0].notes).to.equal('studentNote')
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
})
