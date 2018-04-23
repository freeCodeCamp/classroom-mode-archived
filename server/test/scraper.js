const chai = require('chai')
const expect = chai.expect
const should = require('chai').should()
const scraper = require('../helpers/scraper')
const sinon = require('sinon')
const assert = require('assert')
const request = require('request')

const sandbox = sinon.sandbox.create()

afterEach(function() {
  sandbox.restore()
})

describe('it should scrap data from FCC', () => {
  const testData = JSON.stringify({
    name: 'Utsab Saha',
    profileImage: 'https://avatars3.githubusercontent.com/u/6780322?v=4',
    location: 'San Francisco',
    completedChallenges: [
      {
        title: 'Learn how Free Code Camp Works',
        completed_at: 'Jul 05, 2016',
        updated_at: '',
        url:
          'https://www.freecodecamp.com/challenges/Learn how Free Code Camp Works'
      },
      {
        title: 'Create a GitHub Account and Join our Chat Rooms',
        completed_at: 'Jul 06, 2016',
        updated_at: '',
        url:
          'https://www.freecodecamp.com/challenges/Create a GitHub Account and Join our Chat Rooms'
      },
      {
        title: 'Configure your Code Portfolio',
        completed_at: 'Dec 17, 2017',
        updated_at: '',
        url:
          'https://www.freecodecamp.com/challenges/Configure your Code Portfolio'
      }
    ]
  })

  const userData = JSON.stringify({
    name: 'Utsab Saha',
    profileImage: 'https://avatars3.githubusercontent.com/u/6780322?v=4',
    location: 'San Francisco',
    completedChallenges: []
  })

  it('should return an error if scraper has a non-200 status code', done => {
    try {
      let get = sandbox.stub(request, 'get')
      get.yieldsOn(this, null, {statusCode: 400}, '{}')

      scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
        expect(err).to.equal(true)
        expect(results.error).to.be.a('object')
        done()
      })
    } catch (e) {
      console.log(`Error! should return an error if scraper has a non-200 status code: ${e}`)
    }
  })

  it('should return no errors if scraper has a 200 status code', done => {
    try {
      let get = sandbox.stub(request, 'get')
      get.yieldsOn(this, null, {statusCode: 200}, testData)

      scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
        expect(err).to.equal(false)
        done()
      })
    } catch (e) {
      console.log(`Error! should return no errors if scraper has a 200 status code: ${e}`)
    }
  })

  it('should compute correct number of inactive days', done => {
    try {
      let get = sandbox.stub(request, 'get')
      let now = new Date('December 17, 2017')
      let clock = sandbox.useFakeTimers(now.getTime())

      get.yieldsOn(this, null, {statusCode: 200}, testData)

      scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
        expect(results.daysInactive).to.equal(2)
        done()
      })
    } catch (e) {
      console.log(`Error! should compute correct number of inactive days: ${e}`)
    }
  })

  it('should compute correct number of inactive days when user was active today', done => {
    try {
      let get = sandbox.stub(request, 'get')
      let now = new Date('December 17, 2017')
      let clock = sandbox.useFakeTimers(now.getTime())

      get.yieldsOn(this, null, {statusCode: 200}, testData)

      scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
        expect(results.daysInactive).to.equal(0)
        done()
      })
    } catch (e) {
      console.log(`Error! should compute correct number of inactive days when user was active today: ${e}`)
    }
  })

  it('should respect last updated_at when calculating last daysInactive', done => {
    try {
      let get = sandbox.stub(request, 'get')
      let now = new Date('December 17, 2017')
      let clock = sandbox.useFakeTimers(now.getTime())

      get.yieldsOn(this, null, {statusCode: 200}, testData)

      scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
        expect(results.daysInactive).to.equal(1)
        done()
      })
    } catch (e) {
      console.log(`Error! should respect last updated_at when calculating last daysInactive: ${e}`)
    }
  })

  it('should compute correct number of inactive days when user has no history', done => {
    try {
      let get = sandbox.stub(request, 'get')

      get.yieldsOn(this, null, {statusCode: 200}, userData)
  
      scraper.fetchUserInfoFromFCC('testUser', function(err, results) {
        expect(results.daysInactive).to.equal('N/A')
        done()
      })
    } catch (e) {
      console.log(`Error! should compute correct number of inactive days when user has no history: ${e}`)
    }
  })

})

