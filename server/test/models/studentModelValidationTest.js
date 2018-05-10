const assert = require('assert')
const Student = require('../models/Student')

describe('Validating student records', () => {
  it('requires a name', () => {
    try {
      const student = new Student({ name: undefined })
      const validationResult = student.validateSync()
      const { message } = validationResult.errors.name

      assert(message === 'Name is required.')
    } catch (e) {
      console.log(`Error: ${e}`)
    }
  })

  it("requires a students's name longer than 2 characters", () => {
    try {
      const student = new Student({ name: 'Jo' })
      const validationResult = student.validateSync()
      const { message } = validationResult.errors.name

      assert(message === 'Name must be longer than 2 characters.')
    } catch (e) {
      console.log(
        `Error! requires a students's name longer than 2 characters: ${e}`
      )
    }
  })

  it('disallows invalid records from being saved', done => {
    try {
      const student = Student({ name: 'Al' })
      student.save().catch(validationResult => {
        const { message } = validationResult.errors.name

        assert(message === 'Name must be longer than 2 characters.')
        done()
      })
    } catch (e) {
      console.log(`Error! disallows invalid records from being saved: ${e}`)
    }
  })
})
