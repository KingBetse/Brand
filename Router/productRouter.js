const express = require("express");
const prodController = require("./../Controller/productController");
const prodRouter = express.Router();

prodRouter
  .route("/")
  .get(prodController.getAll)
  .post(prodController.newProduct);
prodRouter
  .route("/:id")
  .get(prodController.getOne)
  .patch(prodController.updateProduct)
  .delete(prodController.deleteOne);

module.exports = prodRouter;
