const path = require("path");
const express = require("express");
const prodModel = require("./model/productModel");
const apiError = require("./util/error");
const globalErrorHandler = require("./Controller/errorController");

const productRouter = require("./Router/productRouter");
const cataRouter = require("./Router/cataRouter");
const userRouter = require("./Router/userRouter");
const viewRouter = require("./Router/viewRouter");

app = express();
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//Routers
app.use("api/v1/product", productRouter);
app.use("api/v1/product/category", cataRouter);
app.use("api/v1/user", userRouter);
app.use("/home", viewRouter);
app.all("*", (req, res, next) => {
  next(new apiError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
