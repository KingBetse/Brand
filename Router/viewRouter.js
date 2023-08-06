const express = require("express");

const viewController = require("./../Controller/viewController");
const authController = require("./../Controller/authController");
const Router = express.Router();

Router.use(authController.isLogedIn);

Router.get("/home", viewController.homePage);
Router.get("/shop", viewController.shopPage);
Router.get("/login", viewController.loginPage);
Router.get("/register", viewController.registerPage);
Router.get("/updateMe", viewController.updateUserPage);

module.exports = Router;
