if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var mongoose = require('mongoose');
require('./models/User');
var User = mongoose.model('user');

var index = require('./routes/index');
var users = require('./routes/users');
var addStudent = require('./routes/addStudent');
var showStudents = require('./routes/showStudents');
var passport = require('passport');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
console.log('server running');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '../client/build')));


//app.use('/', index);
app.use('/users', users);
app.use('/add_student', addStudent);
app.use('/students', showStudents);

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

var GitHubStrategy = require('passport-github').Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.githubClientID,
    clientSecret: process.env.githubClientSecret,
    callbackURL: `${process.env.APP_URL}auth/github/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ githubId: profile.id});

    if (existingUser) {
      done(null, existingUser)
    }
    else {
      const user = await new User({ githubId: profile.id }).save();
      done(null, user);
    }
  }
));

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
