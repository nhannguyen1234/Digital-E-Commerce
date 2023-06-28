const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing input");
  const response = await Blog.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create new blog",
  });
});
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updatedBlog: response ? response : "Cannot update blog",
  });
});
const getBlogs = asyncHandler(async (req, res) => {
  // const { bid } = req.params;
  const response = await Blog.find();
  return res.json({
    success: response ? true : false,
    blogs: response ? response : "Cannot get blogs",
  });
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);
  return res.json({
    success: response ? true : false,
    deletedBlog: response ? response : "Cannot delete blog",
  });
});
/* 
Khi user bấm like 1 blog thì có 2 options :
1. Check xem user có dislike chưa => bỏ dislike => thêm like
2. check xem user có like chưa => !like cho user 
*/
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing input");
  const blog = await Blog.findById(bid);
  // Check xem user co dislike hay k
  const disliked = blog.dislikes.find((el) => el.toString() === _id);
  if (disliked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
    return res.json({
      success: response ? true : false,
      result: response,
    });
  }
  // Check xem user co like hay k
  const liked = blog.likes.find((el) => el.toString() === _id);
  if (liked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
    return res.json({
      success: response ? true : false,
      result: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true });
    return res.json({
      success: response ? true : false,
      result: response,
    });
  }
});
const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing input");
  const blog = await Blog.findById(bid);
  const liked = blog.likes.find((el) => el.toString() === _id);
  if (liked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true });
    return res.json({
      success: response ? true : false,
      result: response,
    });
  }
  const disliked = blog.dislikes.find((el) => el.toString() === _id);
  if (disliked) {
    const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: _id } }, { new: true });
    return res.json({
      success: response ? true : false,
      result: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: _id } }, { new: true });
    return res.json({
      success: response ? true : false,
      result: response,
    });
  }
});
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
    .populate("likes", "firstname lastname")
    .populate("dislikes", "firstname lastname");
  return res.json({
    success: blog ? true : false,
    result: blog,
  });
});
const uploadImgsBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("Missing input");
  const response = await Blog.findByIdAndUpdate(
    bid,
    {
      image: req.file.path,
    },
    { new: true }
  );
  console.log(response);
  return res.json({
    success: response ? true : false,
    uploadedImgs: response ? response : "Cannot upload imgs blog",
  });
});
module.exports = {
  createNewBlog,
  updateBlog,
  getBlog,
  getBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImgsBlog,
};
