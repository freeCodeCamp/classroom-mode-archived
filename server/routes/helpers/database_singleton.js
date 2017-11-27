var mongoose = require('mongoose');

var DB_URI = process.env.DATABASE_URI || require('../../config/secret').DATABASE_URI; 


var db;

function getDbInstance() {
  if (!db) {
    console.log("About to connect to DB_URI: "  + DB_URI );
    mongoose.connect(DB_URI);
    db = mongoose.connection;
  }
  
  return db;
}


module.exports = {
    getDbInstance: getDbInstance,
    DB_URI: DB_URI
}

