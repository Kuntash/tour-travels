const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Enable request body parsing.
app.use(express.json());

// Enable using assets.
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // NOTE: Having an argument inside the next() will be considered by express as an error.
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
});

// In the callback, if you specify all four parameter. i.e [ error, request, response, next ], then express
// considers it an error handler.
app.use(globalErrorHandler);

module.exports = app;
