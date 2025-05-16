import express from 'express';
// import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
// import AppError from './utils/appError.js';

const app = express();
// app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/v1/users', userRouter);

// app.all('*', (req, res, next) => {
//   return next(new AppError(`${req.originalUrl} not found on this server`, 404));
// });

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
});

export default app;
