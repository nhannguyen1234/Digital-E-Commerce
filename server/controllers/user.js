const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {
  genenrateAccessToken,
  genenrateRefreshToken,
} = require("../middlewares/jwt");
// Register function
const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      sucess: false,
      message: "Missing input !!!",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("User has existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      mes: newUser ? "Register is successfully" : "Something went wrong",
    });
  }
});
// Login function
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      message: "Missing input !!!",
    });
  const response = await User.findOne({ email });
  console.log(await response.isCorrectPassword(password));
  if (response && (await response.isCorrectPassword(password))) {
    // Tách pass và role ra khỏi res
    const { password, role, ...userData } = response.toObject();
    // Tạo accessToken
    const accessToken = genenrateAccessToken(response._id, role);
    // Tạo refreshToken
    const refreshToken = genenrateRefreshToken(response._id, role);
    // Lưu refreshToken vào database
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    // Lưu refreshToken vào cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      sucess: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error("Invalid login");
  }
});
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    sucess: true,
    mes: user ? user : "User not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  // lấy token từ cookie
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Check xem token có hợp lệ hay không
  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: result._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    sucess: response ? true : false,
    newAccessToken: response
      ? genenrateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});
const logout = asyncHandler(async (req, res) => {
  // Lấy cookie
  const cookie = req.cookies;
  // Check xem token có hay không
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookie");
  // Xóa refreshtoken ở DB
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refresh token ở cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    sucess: true,
    mes: "Logout done ^^",
  });
});
module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
};
