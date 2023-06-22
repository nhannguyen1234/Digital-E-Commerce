const jwt = require("jsonwebtoken");
const genenrateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, { expiresIn: "100d" });
const genenrateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: "200d" });

module.exports = {
  genenrateAccessToken,
  genenrateRefreshToken,
};
