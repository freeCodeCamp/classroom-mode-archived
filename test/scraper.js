var should = require('chai').should(); 
var scraper = require('../server/routes/helpers/scraper'); 


// scraper.fetchUserInfoFromFCC('utsabsdfsdf', function(err, results) {
//     if (err) {
//         console.log("In test: received error:  "); 
//         console.log(err); 
//     }
//     console.log(results); 
// });


it('should get a successful response for a valid github username', function(done) {
    scraper.fetchUserInfoFromFCC('utsab', function(err, results) {
        should.not.exist(err); 
        done(); 
    });
    
});


it('should get a error response for an invalid github username', function(done) {
    scraper.fetchUserInfoFromFCC('utsabsdfdfsdf', function(err, results) {
        should.exist(err); 
        done(); 
    });
    
});
