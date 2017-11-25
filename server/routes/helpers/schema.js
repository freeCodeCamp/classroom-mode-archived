var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Student = new Schema({
  firstName: { type: String },
  lastName:  { type: String },
  email:     { type: String },
  github:    { type: String }
});

var myModel = mongoose.model( 'Student', Student ); 

