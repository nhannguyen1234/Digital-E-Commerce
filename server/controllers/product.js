const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing input !");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "Cannot create new product",
  });
});
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid).populate({
    path: "ratings",
    populate: {
      path: "postedBy",
      select: "firstname lastname avatar",
    },
  });
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});
const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  //   tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((item) => delete queries[item]);
  //   Format lại các operator cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (item) => `$${item}`);
  const formatQueries = JSON.parse(queryString);
  let colorQueryObject = {};
  // Filtering
  if (queries?.title) formatQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category) formatQueries.category = { $regex: queries.category, $options: "i" };
  if (queries?.color) {
    delete formatQueries.color;
    const colorArray = queries.color?.split(",");
    const colorQuery = colorArray.map((el) => ({ color: { $regex: el, $options: "i" } }));
    colorQueryObject = { $or: colorQuery };
  }
  const manyQuery = { ...colorQueryObject, ...formatQueries };
  let queryCommand = Product.find(manyQuery);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  // Fields Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  // limit : số document lấy về được trong 1 lần gọi API
  // skip : số document bỏ qua trong 1 lần gọi API
  // *1 vì lấy từ query về thì sẽ ở dạng chuỗi cần convert sang dạng số
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCT;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  //  từ phiên bản mongoose 7. -> k xài exec() mà viết .then().catch bth
  queryCommand.exec(async (error, response) => {
    if (error) throw new Error(error.message);
    const counts = await Product.find(manyQuery).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "Cannot get products",
    });
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deleteProduct: deletedProduct ? deletedProduct : "Cannot delete product",
  });
});
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid, updatedAt } = req.body;
  if (!star || !pid) throw new Error("Missing infomations");
  const ratingsProduct = await Product.findById(pid);
  const alreadyRating = ratingsProduct?.ratings?.find((item) => item.postedBy.toString() === _id);
  if (alreadyRating) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: alreadyRating },
      },
      { $set: { "ratings.$.star": star, "ratings.$.comment": comment, "ratings.$.updatedAt": updatedAt } },
      { new: true }
    );
  } else {
    await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
      },
      { new: true }
    );
  }
  const updatedProduct = await Product.findById(pid);
  const ratingsMember = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0);
  updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingsMember) / 10;
  await updatedProduct.save();
  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});
const uploadImgsProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing input");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((item) => item.path) } },
    },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    uploadedImgs: response ? response : "Cannot upload imgs product",
  });
});
module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImgsProduct,
};
