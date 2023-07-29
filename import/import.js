const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const prodModel = require("../model/productModel");
const userModel = require("../model/userModel");

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    // .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("connection successful");
  });

const importProduct = async () => {
  fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((json) => {
      userModel.create(json);
      console.log("Data transfer Succesful");
    })
    .catch((err) => {
      console.log("fake :", err);
    });
};

if (process.argv[2] === "--importProduct") {
  importProduct();
}
