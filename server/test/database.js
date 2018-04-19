/**
 * Our backend tests currently behave more like integration tests than unit
 * tests, because many of them spin up the server (including the database
 * connection) as setup for the tests.  There was a problem where the
 * database connection did not close after the tests completed which
 * would then cause the travis-CI tests to hang indefinitely.  Therefore,
 * we created this file to close the database connection after all
 * the tests are finished running.
 */
const mongoose = require('mongoose');

after(function(){
  mongoose.disconnect();
  console.log("Closing DB connection >>");
});



