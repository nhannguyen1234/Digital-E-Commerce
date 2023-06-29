const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id).select("cart").populate("cart.product", "title price");
  const products = userCart?.cart?.map((item) => ({
    product: item.product._id,
    count: item.quantity,
    color: item.color,
  }));
  let total = userCart?.cart?.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
  const infoOrder = { products, total, orderBy: _id };
  if (coupon) {
    const selectedCoupon = await Coupon.findById(coupon);
    total = Math.round((total * (1 - +selectedCoupon?.discount / 100)) / 1000) * 1000 || total;
    infoOrder.total = total;
    infoOrder.coupon = coupon;
  }
  const result = await Order.create(infoOrder);
  return res.json({
    success: result ? true : false,
    createdOrder: result ? result : "Cannot create new Order",
  });
});
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
  return res.json({
    success: response ? true : false,
    updatedStatus: response ? response : "Cannot update status",
  });
});
const getUserOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });
  return res.json({
    success: response ? true : false,
    userOrder: response ? response : "Cannot get user order",
  });
});
const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.json({
    success: response ? true : false,
    orders: response ? response : "Cannot get orders",
  });
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
