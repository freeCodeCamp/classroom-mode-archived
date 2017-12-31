var mongoose = require('mongoose');

if (process.env.CI === undefined) {
  var DB_URI = process.env.DATABASE_URI || require('../../config/secret').DATABASE_URI;
} else {
  var DB_URI = process.env.DATABASE_URI;
}

var db;

function getDbInstance() {
  if (db) { return db };

  console.log("About to connect to DB_URI: "  + DB_URI );
  mongoose.connect(DB_URI);
  db = mongoose.connection;
  return db;
}

function closeConnection() {
  mongoose.disconnect(); 
  db = null; 
}

module.exports = {
    getDbInstance: getDbInstance,
    closeConnection: closeConnection,
    DB_URI: DB_URI
}

