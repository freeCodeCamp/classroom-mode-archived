const mongoose = require('mongoose')

const Student = mongoose.model('Student')
const scraper = require('../helpers/scraper')

exports.showStudent = (req, res) => {
  let numStudents = 0
  let numResponsesReceived = 0

  Student.find({})
    .lean()
    .then(students => {
      numStudents = students.length

      if (numStudents === 0) {
        res.status(200).json(students)
      }

      students.map(student => {
        scraper.fetchUserInfoFromFCC(student.username, (_err, fccResults) => {
          student.daysInactive = fccResults.daysInactive

          if (fccResults.completedChallenges) {
            const completedChallengesCount = student.completedChallengesCount
              ? student.completedChallengesCount
              : 0
            student.newSubmissionsCount =
              fccResults.completedChallenges.length - completedChallengesCount
          }

          numResponsesReceived++

          if (numResponsesReceived >= numStudents) {
            // console.log(students[0].daysInactive) This does return daysInactive
            // but http://localhost:8083/students doesn't show me. Why? Hm
            res.status(200).json(students)
          }
        })
      })
    })
}

exports.addStudent = (req, res) => {
  const errors = []
  const { name, email, username, notes } = req.body

  if (!name) {
    errors.push('Name is required.')
  }

  if (!username) {
    errors.push('Username is required.')
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/
    if (email && !re.test(email)) {
      console.log('Email is invalid.')
      return 'Email is invalid.'
    } else if (!email) {
      console.log('Email is required.')
      return 'Email is required.'
    }
  }

  const emailValidationError = validateEmail(email)

  if (emailValidationError) {
    errors.push(emailValidationError)
  }

  if (errors.length > 0) {
    res.status(422).json({ errors })
    return
  }

  scraper.fetchUserInfoFromFCC(username, (error, fccResults) => {
    if (!error) {
      Student.find({ username: username })
        .then(user => {
          if (user) {
            errors.push('freeCodeCamp username already exist.')
            res.status(422).json({ errors })
          } else {
            Student.create({
              name: name,
              username: username,
              email: email,
              completedChallengesCount: fccResults.completedChallenges && fccResults.completedChallenges.length,
              completedChallenges: fccResults.completedChallenges
            })
          }
        })
    } else {
      errors.push('freeCodeCamp username is invalid.')
      res.status(422).json({ errors })
    }
  })
}
