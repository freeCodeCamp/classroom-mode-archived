require('dotenv').config({path: 'variables.env'})
const mongoose = require('mongoose')
const Student = require('../models/Student')
const chai = require('chai')
const expect = require('chai').expect
const sinon = require('sinon')
const request = require('supertest')
const serverRequestToScraper = require('request')
const scraper = require('../helpers/scraper')
const assert = require('assert')
const app = require('../app')

const sandbox = sinon.sandbox.create()

afterEach(function() {
  sandbox.restore()
})

describe('POST /add_student', () => {
  beforeEach(async () => {
    Student.create({
      name: 'Quincy Larson',
      email: 'whoknows@freecodecamp.com',
      username: 'quincylarson'
    })
  })

  it('should return an error if student name is absent', done => {
    try {
      request(app)
        .post('/add_student')
        .end(function(_err, res) {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include('Name is required.')
          expect(JSON.parse(res.text).errors).to.include('Email is required.')
          expect(JSON.parse(res.text).errors).to.include(
            'Username is required.'
          )
          done()
        })
    } catch (e) {
      assert.isNotOk(`Error: ${e}`)
      done()
    }
  })

  it('should return an error if email in invalid', done => {
    try {
      request(app)
        .post('/add_student')
        .send({email: 'userfreecodecampcom'})
        .end(function(_err, res) {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include('Email is invalid.')
          done()
        })
    } catch (e) {
      assert.isNotOk(`Error: ${e}`)
      done()
    }
  })

  it('should receive an error message if scraper returns error,', done => {
    try {
      let fetchUserInfoFromFCC = sandbox.stub(scraper, 'fetchUserInfoFromFCC')
      fetchUserInfoFromFCC.yields(true, '{}')

      request(app)
        .post('/add_student')
        .send({
          name: 'fccStudent',
          email: 'user@freecodecamp.com',
          username: 'invalidUsername'
        })
        .end(function(_err, res) {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include(
            'freeCodeCamp username is invalid.'
          )
          done()
        })
    } catch (e) {
      assert.isNotOk(`Error: ${e}`)
      done()
    }
  })

  it('should find a Student by username', done => {
    try {
      Student.findOne({username: 'quincylarson'}).then(foundStudent => {
        assert(foundStudent.email === 'whoknows@freecodecamp.com')
        done()
      })
    } catch (e) {
      assert.isNotOk(`Error: ${e}`)
      done()
    }
  })

  it('should not call the mongoose save method when username is invalid', done => {
    try {
      let fetchUserInfoFromFCC = sandbox.stub(scraper, 'fetchUserInfoFromFCC')
      fetchUserInfoFromFCC.yields(true, '{}')
      let save = sandbox.stub(Student.prototype, 'save')
      save.yields(false)

      request(app)
        .post('/add_student')
        .send({
          name: 'fccStudent',
          email: 'user@freecodecamp.com',
          username: 'invalidusername'
        })
        .end(function(_err, res) {
          expect(res.statusCode).to.equal(422)
          expect(JSON.parse(res.text).errors).to.include(
            'freeCodeCamp username is invalid.'
          )
          expect(save).to.not.have.been.called
          done()
        })
    } catch (e) {
      assert.isNotOk(`Error: ${e}`)
      done()
    }
  })
})

