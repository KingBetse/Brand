const product = require("./../model/productModel");
const prodModel = require("./../model/productModel");
const apiFeature = require("./../util/apiFeature");

exports.getAll = async (req, res, next) => {
  const features = new apiFeature(prodModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const product = await features.query;

  res.status(200).json({
    status: "succsesful",
    result: product.length,
    data: product,
  });
  next();
};
exports.getOne = async (req, res, next) => {
  //   fetch("https://fakestoreapi.com/products/1")

  const id = req.params.id;
  const product = await prodModel.findById(id);
  res.status(200).json({
    status: "succsesful",
    data: product,
  });
  next();
};

exports.deleteOne = async (req, res, next) => {
  const id = req.params.id;
  await prodModel.findByIdAndDelete(id);
  res.status(200).json({
    status: " Deleting succsesful",
  });
  next();
};

exports.getCatagories = async (req, res, next) => {
  next();
};
exports.newProduct = async (req, res, next) => {
  // fetch("https://fakestoreapi.com/products", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     title: "test product",
  //     price: 13.5,
  //     description: "lorem ipsum set",
  //     image: "https://i.pravatar.cc",
  //     category: "electronic",
  //   }),
  // })
  //   .then((resw) => resw.json())
  //   .then((json) => {
  //     res.status(200).json({
  //       status: "succsesful",
  //       data: json,
  //     });
  //   })
  //   .then(() => next());
  const product = await prodModel.create(req.body);
  res.status(200).json({
    status: "succsesful",
    data: "insert succesful",
    product,
  });
  next();
};
exports.updateProduct = async (req, res, next) => {
  // fetch("https://fakestoreapi.com/products/7", {
  //   method: "PATCH",
  //   body: JSON.stringify({
  //     title: "test product",
  //     price: 13.5,
  //     description: "lorem ipsum set",
  //     image: "https://i.pravatar.cc",
  //     category: "electronic",
  //   }),
  // })
  //   .then((resw) => resw.json())
  //   .then((json) => {
  //     res.status(200).json({
  //       status: "succsesful",
  //       data: json,
  //     });
  //   })
  //   .then(() => next());

  const product = await prodModel.findByIdAndUpdate(req.params.id, req.body, {
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
