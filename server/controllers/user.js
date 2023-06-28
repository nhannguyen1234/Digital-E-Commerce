const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
const sendMail = require("../ultis/sendEmail");
const crypto = require("crypto");
// Register function
const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      success: false,
      message: "Missing input !!!",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("User has existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser ? "Register is successfully" : "Something went wrong",
    });
  }
});
// Login function
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "Missing input !!!",
    });
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // Tách pass và role ra khỏi res
    const { password, role, refreshToken, ...userData } = response.toObject();
    // Tạo accessToken
    const accessToken = generateAccessToken(response._id, role);
    // Tạo refreshToken
    const newRefreshToken = generateRefreshToken(response._id, role);
    // Lưu refreshToken vào database
    await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
    // Lưu refreshToken vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
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
    success: true,
    mes: user ? user : "User not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  // lấy token từ cookie
  const cookie = req.cookies;
  // Check xem có token hay không
  if (!cookie && !cookie.refreshToken) throw new Error("No refresh token in cookies");
  // Check xem token có hợp lệ hay không
  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: result._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response ? generateAccessToken(response._id, response.role) : "Refresh token not matched",
  });
});
const logout = asyncHandler(async (req, res) => {
  // Lấy cookie
  const cookie = req.cookies;
  // Check xem token có hay không
  if (!cookie || !cookie.refreshToken) throw new Error("No refresh token in cookie");
  // Xóa refreshtoken ở DB
  await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: "" }, { new: true });
  // Xóa refresh token ở cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout done ^^",
  });
});
const forgotPassword = asyncHandler(async (req, res) => {
  // Lấy email
  const { email } = req.query;
  // Check xem có email được gửi về không
  if (!email) throw new Error("Missing Email !");
  const user = await User.findOne({ email });
  // Check xem email đã được đăng kí chưa
  if (!user) throw new Error("Invalid Email !!!");
  const resetToken = user.createPasswordChangeToken();
  await user.save();
  // Gửi mail
  const html = `Please click on the link below to change your password.This link will expire 15 minutes from now
  .<a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here ^^</a>`;
  const data = {
    email,
    html,
  };
  const result = await sendMail(data);
  return res.status(200).json({
    success: true,
    result,
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  // Hash lại token cho giống database để so sánh
  const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Updated password" : "Something went wrong",
  });
});
const getAllUser = asyncHandler(async (req, res) => {
  const response = await User.find().select("-password -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    user: response,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing input");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response ? `Account created by ${response.email} has been deleted` : "No user delete",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) throw new Error("Missing input !!!");
  if ("password" in req.body) {
    throw new Error("Updating password is not allowed");
  }
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : "Some thing went wrong",
  });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input !!!");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : "Some thing went wrong",
  });
});
const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select(
    "-password -role -refreshToken"
  );
  return res.json({
    success: response ? true : false,
    updatedUserAddress: response ? response : "Cannot update address",
  });
});
const deleteUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(_id, { $pull: { address: req.body.address } }, { new: true }).select(
    "-password -role -refreshToken"
  );
  return res.json({
    success: response ? true : false,
    deletedAddress: response ? response : "Cannot delete user address",
  });
});
module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getAllUser,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateUserAddress,
  deleteUserAddress,
};
