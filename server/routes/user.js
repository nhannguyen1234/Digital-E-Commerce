const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
router.patch("/resetpassword", ctrls.resetPassword);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getAllUser);
router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUser);
router.patch("/current", verifyAccessToken, ctrls.updateUser);
router.patch("/address", verifyAccessToken, ctrls.updateUserAddress);
router.patch("/deladdress", verifyAccessToken, ctrls.deleteUserAddress);
router.patch("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

module.exports = router;
