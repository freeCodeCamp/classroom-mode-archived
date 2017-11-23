var mongoose = require('mongoose');

var DB_URI = process.env.DATABASE_URI || require('../../config/secret').DATABASE_URI; 

console.log("About to connect to DB_URI: "  + DB_URI );

mongoose.connect(DB_URI);

var db = mongoose.connection;

db.on('error', function() {
  console.log("Database connection error: " + DB_URI);
});

db.once('open', function() {
  console.log("Successfully connected to DB_URI: " + DB_URI);
});

module.exports = {
    db: db,
    DB_URI: DB_URI
}

