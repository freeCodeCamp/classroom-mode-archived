var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  name: { type: String },
  username:  { type: String, unique : true },
  email:     { type: String, unique : true },
  notes:    { type: String }
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
