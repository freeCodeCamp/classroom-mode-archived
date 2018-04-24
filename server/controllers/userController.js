const scraper = require('../helpers/scraper'); 

exports.getUserById = (req, res) => {
    let githubName = req.params.userId; 
    console.log("params: ", req.params);
    
    scraper.fetchUserInfoFromFCC(githubName, function(err, results) {
        if (err) {
            console.log(results); 
        }
        
        res.json(results); 
    });
}