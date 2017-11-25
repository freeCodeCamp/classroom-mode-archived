var mongoose = require('mongoose');

var DB_URI = process.env.DATABASE_URI || require('../../config/secret').DATABASE_URI; 

console.log("About to connect to DB_URI: "  + DB_URI );

var db

function getDbInstance() {
  return db;
}

function connectToDB(cb) {
    mongoose.connect(DB_URI);

  db = mongoose.connection;

  db.on('error', function() {
    console.log("Database connection error: " + DB_URI);
  });

  db.once('open', function() {
    console.log("Successfully connected to DB_URI: " + DB_URI);
    cb(); 
  })
} 

module.exports = {
    getDbInstance: getDbInstance,
    connectToDB: connectToDB,
    DB_URI: DB_URI
}

