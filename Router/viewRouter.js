const express = require("express");

const viewController = require("./../Controller/viewController");
const Router = express.Router();

Router.get("/home", viewController.homePage);
Router.get("/shop", viewController.shopPage);
Router.get("/login", viewController.loginPage);
Router.get("/register", viewController.registerPage);

module.exports = Router;
