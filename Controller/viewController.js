const productModel = require("./../model/productModel");
const userModel = require("./../model/userModel");
const catchAsyn = require("./../util/catchAsync");
const apiError = require("./../util/error");

exports.homePage = catchAsyn(async (req, res, next) => {
  const products = await productModel.find();

  res.status(200).render("home", {
    title: "Clothin",
    products,
  });
});
exports.shopPage = catchAsyn(async (req, res, next) => {
  const products = await productModel.find();

  res.status(200).render("shop", {
    title: "Clothin",
    products,
  });
});
exports.loginPage = catchAsyn(async (req, res, next) => {
  res.status(200).render("LogIn", {
    title: "Clothin",
  });
});
exports.registerPage = catchAsyn(async (req, res, next) => {
  res.status(200).render("register", {
    title: "Clothin",
  });
});
exports.updateUserPage = catchAsyn(async (req, res, next) => {
  res.status(200).render("updateMe", {
    title: "Clothin",
  });
});
exports.logOutPage = catchAsyn(async (req, res, next) => {
  res.status(200).render("logout", {
    title: "Clothin",
  });
});
