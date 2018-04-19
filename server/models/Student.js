const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');

const studentSchema = new Schema({
  name: { 
    type: String,
    trim: true
  },
  username: { 
    type: String 
  },
  email: { 
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  notes: { 
    type: String 
  },
  completedChallengesCount: { 
    type: Number 
  },
  completedChallenges: {
    type: Array 
  }
});

module.exports = mongoose.model('Student', studentSchema);
