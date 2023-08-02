const userModel = require("./../model/userModel");
const catchAsyn = require("./../util/catchAsync");
const apiError = require("./../util/error");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../util/sendEmail");
const crypto = require("crypto");
// const { use } = require("../Router/userRouter");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
exports.signUp = catchAsyn(async (req, res, next) => {
  const user = await userModel.create({
    name: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    address: {
      city: req.body.city,
    },
  });
  if (user) {
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  }
});
exports.logIn = catchAsyn(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return await res.status(404).json({
      status: "fail",
      message: "Enter the email and password",
    });
  }
  const user = await userModel.findOne({ email });

  if (!user || !(user.password === password)) {
    return await res.status(404).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }
  const token = signToken(user._id);
  return await res.status(200).json({
    status: "success",
    message: "we did it bruh",
    token,
  });
});

exports.protectRoute = catchAsyn(async (req, res, next) => {
  //1
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    next(new apiError(" you are not loged in,Please login first", 401));
  }
  //2
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3
  const currentUser = await userModel.findById(decode.id);
  if (!currentUser) {
    return next(new apiError("the user is not found", 401));
  }

  req.user = currentUser;
  next();
});
exports.restrict = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'

    if (!roles.includes(req.user.role)) {
      return next(
        new apiError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
exports.forgotPassword = catchAsyn(async (req, res, next) => {
  const email = req.body.email;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new apiError("Invalid email", 401));
  }
  const resetToken = await user.changePassToken();

  //saving the resetToken and token expire time
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}user/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token( valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent ot email",
    });
  } catch (err) {
    user.PasswordResetToken = undefined;
    user.PasswordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new apiError("There was an error sending the message", 500));
  }
});
exports.resetPassword = catchAsyn(async (req, res, next) => {
  const emailToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await userModel.findOne({
    passwordResetToken: emailToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new apiError("invalid token or the token has been expired"));
  }

  user.password = req.body.password;
  //saving password
  await user.save();
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
