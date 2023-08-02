const express = require("express");
const userController = require("./../Controller/userController");
const authController = require("./../Controller/authController");
const { replaceOne } = require("../model/userModel");

const Router = express.Router();
Router.post("/signup", authController.signUp);
Router.post("/signin", authController.logIn);
Router.patch("/resetPassword/:token", authController.resetPassword);
Router.post("/forgotPassword", authController.forgotPassword);
Router.route("/")
  .get(
    // authController.protectRoute,
    // authController.restrict("admin"),
    userController.showAllUsers
  )
  .post(userController.newUser);
Router.route("/:id")
  .get(authController.protectRoute, userController.getOne)
  .patch(authController.protectRoute, userController.updateUser)
  .delete(
    // authController.protectRoute,
    userController.deleteOne
  );

module.exports = Router;
