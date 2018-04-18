if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var mongoose = require('mongoose');

var db;

function getDbInstance() {
  if (db) { return db };

  console.log(`About to connect to DB_URI: ${process.env.DATABASE_URI}` );
  mongoose.connect(process.env.DATABASE_URI);
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
    DB_URI: process.env.DATABASE_URI
}

