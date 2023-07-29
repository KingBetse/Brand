const express = require("express");
const prodModel = require("./model/productModel");

const productRouter = require("./Router/productRouter");
const cataRouter = require("./Router/cataRouter");
const userRouter = require("./Router/userRouter");

app = express();
app.use(express.json());
//Routers
app.use("/product", productRouter);
app.use("/product/category", cataRouter);
app.use("/user", userRouter);

module.exports = app;
