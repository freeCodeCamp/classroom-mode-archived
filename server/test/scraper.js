const chai = require('chai')

const expect = chai.expect
const should = require('chai').should()
const scraper = require('../helpers/scraper')
const sinon = require('sinon')
const assert = require('assert')
const request = require('request')

const sandbox = sinon.sandbox.create()

afterEach(() => {
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
          'https://www.freecodecamp.com/challenges/Learn how Free Code Camp Works',
      },
      {
        title: 'Create a GitHub Account and Join our Chat Rooms',
        completed_at: 'Jul 06, 2016',
        updated_at: '',
        url:
          'https://www.freecodecamp.com/challenges/Create a GitHub Account and Join our Chat Rooms',
      },
      {
        title: 'Configure your Code Portfolio',
        completed_at: 'Dec 17, 2017',
        updated_at: '',
        url:
          'https://www.freecodecamp.com/challenges/Configure your Code Portfolio',
      },
    ],
  })

  const userData = JSON.stringify({
    name: 'Utsab Saha',
    profileImage: 'https://avatars3.githubusercontent.com/u/6780322?v=4',
    location: 'San Francisco',
    completedChallenges: [],
  })

  it('should return an error if scraper has a non-200 status code', done => {
    try {
      const get = sandbox.stub(request, 'get')
      get.yieldsOn(this, null, { statusCode: 400 }, '{}')

      scraper.fetchUserInfoFromFCC('testUser', (err, results) => {
        expect(err).to.equal(true)
        expect(results.error).to.be.a('object')
        done()
      })
    } catch (e) {
      console.log(
        `Error! should return an error if scraper has a non-200 status code: ${e}`
      )
    }
  })

  it('should return no errors if scraper has a 200 status code', done => {
    const get = sandbox.stub(request, 'get')
    get.yieldsOn(this, null, { statusCode: 200 }, testData)

    scraper.fetchUserInfoFromFCC('testUser', (err, results) => {
      expect(err).to.equal(false)
      done()
    })
  })

  it('should compute correct number of inactive days', done => {
    const get = sandbox.stub(request, 'get')
    const now = new Date('December 19, 2017')
    const clock = sandbox.useFakeTimers(now.getTime())

    get.yieldsOn(this, null, { statusCode: 200 }, testData)

    scraper.fetchUserInfoFromFCC('testUser', (err, results) => {
      expect(results.daysInactive).to.equal(2)
      done()
    })
  })

  it('should compute correct number of inactive days when user was active today', done => {
    const get = sandbox.stub(request, 'get')
    const now = new Date('December 17, 2017')
    const clock = sandbox.useFakeTimers(now.getTime())

    get.yieldsOn(this, null, { statusCode: 200 }, testData)

    scraper.fetchUserInfoFromFCC('testUser', (err, results) => {
      expect(results.daysInactive).to.equal(0)
      done()
    })
  })

  it('should respect last updated_at when calculating last daysInactive', done => {
    const get = sandbox.stub(request, 'get')
    const now = new Date('December 19, 2017')
    const clock = sandbox.useFakeTimers(now.getTime())

    const testData = JSON.stringify({
      name: 'Utsab Saha',
      profileImage: 'https://avatars3.githubusercontent.com/u/6780322?v=4',
      location: 'San Francisco',
      completedChallenges: [
        {
          title: 'Configure your Code Portfolio',
          completed_at: 'Dec 16, 2017',
          updated_at: 'Dec 17, 2017',
          url:
            'https://www.freecodecamp.com/challenges/Configure your Code Portfolio',
        },
      ],
    })

    get.yieldsOn(this, null, { statusCode: 200 }, testData)

    scraper.fetchUserInfoFromFCC('testUser', (err, results) => {
      expect(results.daysInactive).to.equal(2)
      done()
    })
  })

  it('should compute correct number of inactive days when user has no history', done => {
    const get = sandbox.stub(request, 'get')

    get.yieldsOn(this, null, { statusCode: 200 }, userData)

    scraper.fetchUserInfoFromFCC('testUser', (err, results) => {
      expect(results.daysInactive).to.equal('N/A')
      done()
    })
  })
})
