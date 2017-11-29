var should = require('chai').should(); 
var database = require('../server/routes/helpers/database_singleton'); 


it('should have a DATABASE_URI defined', function(done) {
    database.DB_URI.should.not.equal(''); 
    done(); 
});


describe('getDbInstance()', function(){
  it('should connect db when db is undefined', function(done){
    var subject = database.getDbInstance();
    subject.should.be.an('object').that.respondTo('databaseName');
    done();
  })
    
  it('should not connect db when db is defined', function(done){
    var db = new Object;
    database.getDbInstance().should.equal(db);
    done();
  })
})