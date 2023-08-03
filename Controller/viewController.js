const productModel = require("./../model/productModel");
const userModel = require("./../model/userModel");
const catchAsyn = require("./../util/catchAsync");
const apiError = require("./../util/error");

exports.homePage = catchAsyn(async (req, res, next) => {
  const product = await productModel.find();
  if (!product) {
    return next(new apiError("there is no products at the moment"));
  }

  res.status(200).render("home", {
    title: "Clothin",
    product,
  });
});
