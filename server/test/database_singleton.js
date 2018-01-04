var should = require('chai').should(); 
var sinon = require('sinon');
var mongoose = require('mongoose');
var databaseModule = require('../routes/helpers/database_singleton'); 


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