require('dotenv').config({ path: 'variables.env' })
const Student = require('../models/Student')
const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')

describe('DELETE /students', () => {
  it('should return an error if student name is absent', async () => {
    const student = await Student.create({
      name: 'Student Name',
      email: 'studentName@example.com',
      username: 'studentUsername',
    })

    request(app)
      .delete(`/students/${student._id}`)
      .end((_err, res) => {
        expect(res.status).to.equal(204)
        Student.find({ id: student._id }).lean().then(result => {
          expect(result).to.equal([])
        })
      })
  })
})