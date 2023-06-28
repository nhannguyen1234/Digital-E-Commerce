const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadImgs = require("../config/cloudinary.config");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get("/", ctrls.getBlogs);

router.get("/one/:bid", ctrls.getBlog);
router.patch("/image/:bid", [verifyAccessToken], uploadImgs.single("image"), ctrls.uploadImgsBlog);
router.patch("/like/:bid", verifyAccessToken, ctrls.likeBlog);
router.patch("/dislike/:bid", verifyAccessToken, ctrls.disLikeBlog);
router.patch("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete("/del/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);
module.exports = router;
