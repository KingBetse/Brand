const express = require("express");
const prodModel = require("./model/productModel");
const apiError = require("./util/error");
const globalErrorHandler = require("./Controller/errorController");

const productRouter = require("./Router/productRouter");
const cataRouter = require("./Router/cataRouter");
const userRouter = require("./Router/userRouter");

app = express();
app.use(express.json());
//Routers
app.use("/product", productRouter);
app.use("/product/category", cataRouter);
app.use("/user", userRouter);
app.all("*", (req, res, next) => {
  next(new apiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
