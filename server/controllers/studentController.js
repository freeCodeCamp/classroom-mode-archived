const mongoose = require('mongoose')
const request = require('request')

const Student = mongoose.model('Student')

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

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndRemove(req.params.studentId)
    res.sendStatus(204)
  } catch (e) {
    console.log(`Error: ${e}`)
  }
}

exports.showStudent = (_req, res) => {
  Student.find({})
    .lean()
    .then(students => {
      res.status(200).json(students)
    })
}

exports.addStudent = (req, res) => {
  const errors = []
  const { email, notes } = req.body

  const emailValidationError = validateEmail(email)

  if (emailValidationError) {
    errors.push(emailValidationError)
  }

  if (errors.length > 0) {
    res.status(422).json({ errors })
    return
  }

  const postData = {
    query: `{ getUser(email: "${email}") {name email}}`
  }
  const url = 'http://localhost:4000/graphql'
  const options = {
    body: postData,
    json: true,
    url: url,
    headers: {"Authorization": `Bearer ${process.env.OPENAPI_TEMP_TOKEN}`}
  }
  request.post(options, function(err, _apiRes, body) {
    if (err) {
      console.log(err)
    }
    if (!body.data.getUser) {
      errors.push(body.errors[0].message)
      res.status(422).json({ errors })
    } else {
      const { name } = body.data.getUser
      const newEmail = body.data.getUser.email
      if (!err) {
        const student = new Student({
          name,
          email: newEmail,
          notes,
        })
        student.save(err => {
          if (err) {
            console.log('Student saved failed', student)
            res.sendStatus(500)
          }
          console.log('Studnet saved', student)
          res.sendStatus(200)
        })
      }
    }
    })
}

exports.updateStudent = (req, res) => {
  const errors = []
  const newStudent = req.body
  const { email, studentId } = newStudent

  const emailValidationError = validateEmail(email)

  if (emailValidationError) {
    errors.push(emailValidationError)
  }

  if (errors.length > 0) {
    console.error(errors)
    return res.status(422).json({ errors })
  }

  Student.findOne({ _id: studentId })
    .then(document => document._doc)
    .then(existingStudent => {
      const mergedStudent = Object.assign({}, existingStudent, newStudent)
      if (mergedStudent.email !== existingStudent.email) {
        return new Promise((resolve, reject) => {
          const postData = {
            query: `{ getUser(email: "${mergedStudent.email}") {name email}}`
          }
          const url = 'http://localhost:4000/graphql'
          const options = {
            body: postData,
            json: true,
            url: url,
            headers: {"Authorization": `Bearer ${process.env.OPENAPI_TEMP_TOKEN}`}
          }
          request.post(options, (err, _apiRes, body) => {
            if (!body.data.getUser) {
              reject(body.errors)
            }
            resolve(mergedStudent)
          })
        })
      }
      return new Promise(resolve => {
        resolve(mergedStudent)
      })
    })
    .then(student => {
      Student.findOneAndUpdate({ _id: student._id }, student).then(() =>
        res.json(student)
      )
    })
    .catch(errors => {
      console.error(errors)
      res.status(422).json(errors)
    })
}
