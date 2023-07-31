const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler((req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).json({
          success: false,
          mes: "Invalid Access Token",
        });
      }
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Require authentication!!!",
    });
  }
});
const isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (+role !== 1006)
    return res.status(401).json({
      success: false,
      mes: "Require Admin Role",
    });
  next();
});
module.exports = {
  verifyAccessToken,
  isAdmin,
};
