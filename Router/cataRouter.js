const express = require("express");
const cataController = require("./../Controller/cataController");
const Router = express.Router();

Router.get("/clothing", cataController.getClothing);
Router.get("/clothing/men'sClothing", cataController.getMenClothing);
Router.get("/clothing/women'sClothing", cataController.getWomenClothing);
Router.get("/electronics", cataController.getElectronics);
Router.get("/jewelery", cataController.getJewlery);

module.exports = Router;
