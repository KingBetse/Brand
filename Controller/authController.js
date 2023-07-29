const userModel = require("./../model/userModel");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return await res.status(404).json({
      status: "fail",
      message: "Enter the email and password",
    });
  }
  const user = await userModel.findOne({ email });
  const token = signToken(user._id);

  if (!user || !(user.password === password)) {
    return await res.status(404).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }

  return await res.status(200).json({
    status: "success",
    message: "we did it bruh",
  });

  next();
};
