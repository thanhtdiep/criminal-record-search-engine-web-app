var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
//   Initialize routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
//  Swagger Docs
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const helmet = require('helmet');
//  SSL
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('./sslcert/cert.key','utf8');
const certificate = fs.readFileSync('./sslcert/cert.pem','utf8');
const credentials = {
  key: privateKey,
  cert: certificate
};


const cors = require('cors');

var app = express();

//  Create database connection
const options = require('./knexfile.js');
const knex = require('knex')(options);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//  Logging
var loggerFormat = '[:date[web]] ":method :url" :status :response-time';
app.use(morgan(loggerFormat));


app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
  req.db = knex
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use  ('/',  swaggerUI.serve,  swaggerUI.setup(swaggerDocument)) 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// //  Passport Config
// require('./config/passport')(passport);
// //  Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());
const server = https.createServer(credentials,app);
server.listen(443);

module.exports = app;
