const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const response = {
    status: err.status,
    message: err.message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.error = err;
    response.stack = err.stack;
  }

  res.status(err.statusCode).json(response);
};

export default globalErrorHandler;
