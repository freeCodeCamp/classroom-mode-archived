const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const expressGraphQL = require('express-graphql')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const schema = require('./schema/schema')

const app = express()

const index = require('./routes/index')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')
console.log('server running')

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoReconnect: true,
    }),
  })
)

app.use(express.static(path.join(__dirname, '../client/build')))

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
)

// @todo prefix with /api/
app.use('/', index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
