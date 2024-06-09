const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const DBConnection = require('./db/DBConnection');

// Import middleware
const authMiddleware = require('./middleware/auth');

// Import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/user'); // I assume this is your authentication route
const protectedRouter = require('./routes/protectedRoutes');

const app = express();

// Database connection
DBConnection()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection error:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes setup
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/protected', authMiddleware, protectedRouter); // Apply auth middleware to protected routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
