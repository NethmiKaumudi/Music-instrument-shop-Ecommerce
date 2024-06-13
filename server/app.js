const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const dotenv = require('dotenv');
const DBConnection = require('./db/DBConnection');


// const authMiddleware = require('./middleware/authMiddleware');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/user');
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orderRoutes');

// const protectedRouter = require('./routes/protectedRoutes');

const app = express();

// Connect to the database
DBConnection()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection error:', err));

dotenv.config();

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure CORS to allow requests from 'http://localhost:3000'
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

// app.use('/protected', authMiddleware, protectedRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
