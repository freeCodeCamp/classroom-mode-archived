const scraper = require('../helpers/scraper')

exports.getUserById = (req, res) => {
  const githubName = req.params.userId
  console.log('params: ', req.params)

  scraper.fetchUserInfoFromFCC(githubName, (err, results) => {
    if (err) {
      console.log(results)
    }

    res.json(results)
  })
}
