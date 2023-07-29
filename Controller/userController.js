const userModel = require("./../model/userModel");

exports.showAllUsers = async (req, res, next) => {
  const user = await userModel.find();
  res.status(200).json({
    status: "succsesful",
    result: user.length,
    data: user,
  });
  next();
};
exports.getOne = async (req, res, next) => {
  const id = req.params.id;
  const product = await userModel.findById(id);
  res.status(200).json({
    status: "succsesful",
    data: product,
  });
  next();
};

exports.deleteOne = async (req, res, next) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.status(200).json({
    status: " Deleting succsesful",
  });
  next();
};
exports.newProduct = async (req, res, next) => {
  const product = await userModel.create(req.body);
  res.status(200).json({
    status: "succsesful",
    data: "insert succesful",
    product,
  });
  next();
};
exports.updateProduct = async (req, res, next) => {
  const product = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "succsesful",
    data: "update succesful",
    product,
  });
  next();
};
