export const errorMiddleware = (err, req, res, next) => {
  const statusHttp = err.errorStatus || err.status || 500;
  const code = err.errorCode || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';

  res.status(statusHttp).json({
    status: statusHttp,
    code: code,
    message: message,
    stack: err?.stack || null,
  });
};
