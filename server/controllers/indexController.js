var request = require('request');

exports.getHome = (req, res) => {
  console.log('index.js')
  var postData = {
    query: '{ getUser(email: "jason@example.com") {name email}}'
  }
  var url = 'http://localhost:4000/graphql'
  var options = {
    method: 'post',
    body: postData,
    json: true,
    url: url,
    headers: {"Authorization": "Bearer some_token"}
  }

  request(options, function(err, res, body) {
    if (err) {
      console.log(err)
    }
    console.log(res)
    console.log(body)
  })
  res.render('index', { title: 'Express' })
}