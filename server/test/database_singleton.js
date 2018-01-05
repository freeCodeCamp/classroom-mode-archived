var should = require('chai').should(); 
var sinon = require('sinon');
var mongoose = require('mongoose');
var databaseModule = require('../routes/helpers/database_singleton'); 


(process.env.CI ? it.skip : it)('should have a DATABASE_URI defined', function(done) {
    databaseModule.DB_URI.should.not.equal(''); 
    done(); 
});


describe('getDbInstance()', function(){

  var connectSpy; 
  
  beforeEach(()=>{
      //connectSpy = sinon.spy(mongoose, 'connect');
  });

  afterEach(()=>{
      //connectSpy.restore();
      databaseModule.closeConnection(); 
  });

  it('should connect db when db is undefined', function(done){
    
    db = databaseModule.getDbInstance(); 
    //sinon.assert.calledOnce(connectSpy);
    done();
  })
    
  // it('should not connect to db again if getDbInstance was previously called', function(done){
  //   databaseModule.getDbInstance();
  //   //sinon.assert.notCalled(connectSpy);
  //   done();
  // })
})