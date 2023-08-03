const express = require("express");

const viewController = require("./../Controller/viewController");
const Router = express.Router();

Router.get("", viewController.homePage);

module.exports = Router;
