var should = require('chai').should(); 
var sinon = require('sinon');
var mongoose = require('../server/node_modules/mongoose');
var databaseModule = require('../server/routes/helpers/database_singleton'); 


it('should have a DATABASE_URI defined', function(done) {
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
  });

  it('should connect db when db is undefined', function(done){
    
    var subject = databaseModule.getDbInstance(); 
    //sinon.assert.calledOnce(connectSpy);
    done();
  })
    
  // it('should not connect to db again if getDbInstance was previously called', function(done){
  //   databaseModule.getDbInstance();
  //   //sinon.assert.notCalled(connectSpy);
  //   done();
  // })
})