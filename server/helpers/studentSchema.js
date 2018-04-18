var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  name: { type: String },
  username:  { type: String },
  email:     { type: String },
  notes:    { type: String },
  completedChallengesCount: { type: Number },
  completedChallenges: { type: Array }
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;