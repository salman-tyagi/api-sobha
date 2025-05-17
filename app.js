import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import userRouter from './routes/userRouter.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/globalErrorHandler.js';

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.all('{*splat}', (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
