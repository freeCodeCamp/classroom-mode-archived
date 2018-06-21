const mongoose = require('mongoose')

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' })

// Connect to the Database
mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
})

mongoose.Promise = global.Promise
mongoose.connection
  .once('open', () => console.log('Connected to mongodb'))
  .on('error', err => {
    console.error(`🙅 🚫 → ${err.message}`)
  })

// import all of the models
require('./models/Student')
require('./models/Teacher')

// Start the server!
const app = require('./app')

app.set('port', process.env.PORT || 8083)
const server = app.listen(app.get('port'), () => {
  console.log(`Server running → PORT ${server.address().port}`)
})
