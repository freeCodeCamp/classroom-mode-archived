var should = require('chai').should(); 
var sinon = require('sinon');
var mongoose = require('../server/node_modules/mongoose');
var databaseModule = require('../server/routes/helpers/database_singleton'); 


it('should have a DATABASE_URI defined', function(done) {
    databaseModule.DB_URI.should.not.equal(''); 
    done(); 
});


describe('getDbInstance()', function(){

  it('should connect db when db is undefined', sinon.test(function(done){
    var connectSpy = sinon.spy(mongoose, 'connect');
    var subject = databaseModule.getDbInstance(); 
    sinon.assert.calledOnce(connectSpy);
    connectSpy.restore(); 
    done();
  }))
    
  it('should not connect to db again if getDbInstance was previously called', sinon.test(function(done){
    databaseModule.getDbInstance();
    var connectSpy = sinon.spy(mongoose, 'connect');
    databaseModule.getDbInstance();
    sinon.assert.notCalled(connectSpy);
    connectSpy.restore(); 
    done();
  }))
})