const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const { Schema } = mongoose
mongoose.Promise = global.Promise
const validator = require('validator')

const teacherSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
  },
  password: {
    type: String,
  },
})

module.exports = mongoose.model('Teacher', teacherSchema)
