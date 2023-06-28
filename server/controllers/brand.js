const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createNewBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBrand: response ? response : "Cannot create new brand",
  });
});
const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    brands: response ? response : "Cannot get brands",
  });
});
const updateBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await Brand.findByIdAndUpdate(brid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updatedBrand: response ? response : "Cannot update brand",
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { brid } = req.params;
  const response = await Brand.findByIdAndDelete(brid);
  return res.json({
    success: response ? true : false,
    deletedBrand: response ? response : "Cannot delete brand",
  });
});
module.exports = {
  createNewBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
