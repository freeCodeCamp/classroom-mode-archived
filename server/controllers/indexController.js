exports.getHome = (req, res) => {
  console.log('index.js')
  res.render('index', { title: 'Express' })
}
