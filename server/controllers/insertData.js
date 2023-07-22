const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const data = require("../../Data/data.json");
const categoryData = require("../../Data/cate_brand");
const slugify = require("slugify");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + "-" + Math.round(Math.random() * 1000) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((item) => item.label === "Color")?.variants[0],
    thumb: product?.thumb,
    totalRatings: 0,
  });
};
const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    image: cate?.image,
  });
};
const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  return res.json("Done");
});
const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  for (let cate of categoryData) promises.push(fn2(cate));
  await Promise.all(promises);
  return res.json("Done");
});
module.exports = {
  insertProduct,
  insertCategory,
};
