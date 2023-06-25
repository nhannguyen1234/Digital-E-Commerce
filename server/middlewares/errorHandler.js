const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.original} is not found !`);
  res.status(404);
  next(error);
};
const errorHandler = (error, req, res, next) => {
  //   const statusCode = res.status(res.statusCode || 500).send(error.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    mes: error?.message,
  });
};
module.exports = {
  notFound,
  errorHandler,
};
