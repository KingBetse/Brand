const prodModel = require("./../model/productModel");

exports.getClothing = async (req, res, next) => {
  const product = await prodModel
    .find()
    .where("category")
    .equals("men's clothing")
    .where("category")
    .equals("women's clothing");
  res.status(200).json({
    status: "succsesful",
    result: product.length,
    data: product,
  });
  next();
};
exports.getMenClothing = async (req, res, next) => {
  const product = await prodModel
    .find()
    .where("category")
    .equals("men's clothing");

  res.status(200).json({
    status: "succsesful",
    result: product.length,
    data: product,
  });
  next();
};
exports.getWomenClothing = async (req, res, next) => {
  const product = await prodModel
    .find()
    .where("category")
    .equals("women's clothing");
  res.status(200).json({
    status: "succsesful",
    result: product.length,
    data: product,
  });
  next();
};
exports.getJewlery = async (req, res, next) => {
  const product = await prodModel.find().where("category").equals("jewelery");

  res.status(200).json({
    status: "succsesful",
    result: product.length,
    data: product,
  });
  next();
};
exports.getElectronics = async (req, res, next) => {
  const product = await prodModel
    .find()
    .where("category")
    .equals("electronics");

  res.status(200).json({
    status: "succsesful",
    result: product.length,
    data: product,
  });
  next();
};
