const userModel = require("./../model/userModel");
const catchAsyn = require("./../util/catchAsync");
const apiError = require("./../util/error");

exports.showAllUsers = catchAsyn(async (req, res, next) => {
  const user = await userModel.find();
  res.status(200).json({
    status: "succsesful",
    result: user.length,
    data: user,
  });
  next();
});
exports.getOne = catchAsyn(async (req, res, next) => {
  const id = req.params.id;
  const product = await userModel.findById(id);
  res.status(200).json({
    status: "succsesful",
    data: product,
  });
  next();
});

exports.deleteOne = catchAsyn(async (req, res, next) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.status(200).json({
    status: " Deleting succsesful",
  });
  next();
});
exports.newUser = catchAsyn(async (req, res, next) => {
  const product = await userModel.create(req.body);
  res.status(200).json({
    status: "succsesful",
    data: "insert succesful",
    product,
  });
  next();
});
exports.updateUser = catchAsyn(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new apiError(
        "you can not change your password here. got /resetPassword",
        404
      )
    );
  }
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "succsesful",
    data: "update succesful",
    user,
  });
  next();
});
exports.updatePassword = catchAsyn(async (req, res, next) => {
  if (!req.body.password) {
    return next(
      new apiError("you can not anythig other than your password here.", 404)
    );
  }
});
