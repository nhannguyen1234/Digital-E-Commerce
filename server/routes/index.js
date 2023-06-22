const userRouter = require("./user");
const { notFound, errorHandler } = require("../middlewares/errorHandler");
const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use(notFound);
  app.use(errorHandler);
};
module.exports = initRouter;
