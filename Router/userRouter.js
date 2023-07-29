const express = require("express");
const userController = require("./../Controller/userController");
const authController = require("./../Controller/authController");

const Router = express.Router();
Router.post("/signin", authController.logIn);
Router.route("/")
  .get(userController.showAllUsers)
  .post(userController.newProduct);
Router.route("/:id")
  .get(userController.getOne)
  .patch(userController.updateProduct)
  .delete(userController.deleteOne);

module.exports = Router;
