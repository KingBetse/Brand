const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "User must have Email"],
    unique: [true, "user must not have the same email"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    require: [true, "User must have password"],
    minLength: 4,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  name: {
    firstname: {
      type: String,
      require: [true, "User must have first name"],
    },
    lastname: {
      type: String,
      require: [true, "User must have last name"],
    },
  },
  address: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    number: { type: Number },
    zipcode: { type: String },
  },

  passwordResetToken: String,
  passwordResetExpires: Date,
});
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   this.password = await bcrypt.hash(this.password, 12);
//   console.log(this.password);
//   next();
// });
// userSchema.methods.correctPassword = async function (
//   Enteredpassword,
//   currentPassword
// ) {
//   return await bcrypt.compare(Enteredpassword, currentPassword);
// };
userSchema.methods.changePassToken = async function () {
  //creating token
  const resetToken = crypto.randomBytes(32).toString("hex");
  //encripting token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //setting expire Time
  this.passwordResetExpires = Date.now() + 60 * 10 * 1000;
  // console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};
const user = mongoose.model("user", userSchema);

module.exports = user;
