import 'dotenv/config.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import postsRouter from './routes/postsRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import uploadHandler from './middlewares/uploadHandler.js';
import uploadResponse from './middlewares/uploadResponse.js';
import verifyToken from './middlewares/verifyToken.js';
import './db/mongoose.js';

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  const morgan = await import('morgan');
  app.use(morgan.default('dev'));
}

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);
app.use(express.json());
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.post('/image-upload', verifyToken, uploadHandler.single('image'), uploadResponse);
app.all('*', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));





// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
