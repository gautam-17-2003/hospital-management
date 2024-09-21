import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateTokens } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role, // this should be given by our self
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill full form!", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already registgered!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  });
  generateTokens(user, "User registered Successfully!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("please provide the details!", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("you doesn't confirm the password right!", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password or Email!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password or Email!", 400));
  }
  if (role !== user.role) {
    return next(
      new ErrorHandler("user with this particular role not found!", 400)
    );
  }
  generateTokens(user, "User LoggedIn Successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(new ErrorHandler("Please Fill full form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} already registered!`));
  }
  const admin = User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New admin registered!",
    admin,
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged out Successfully!",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged out Successfully!",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return next(new ErrorHandler("docAvatar required!", 400));
  // }
  // const { docAvtar } = req.files;
  const allowedFormats = [
    "/image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];
  // if (!allowedFormats.includes(docAvtar.mimetype)) {
  //   return next(new Errorhandler("File format not supported!", 400));
  // }

  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    docDept,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !docDept
  ) {
    return next(new ErrorHandler("Please provide full details!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `The ${isRegistered.role} already registered with this email!`
      ),
      400
    );
  }

  // const cloudinaryResponse = await cloudinary.uploader.upload(docAvtar.tempFilePath);
  // if(!cloudinaryResponse || cloudinaryResponse.error ){
  //   console.log("Cloudinary error:",cloudinaryResponse.error || "Unknown cloudinary error");
  // }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    docDept,
    role: "Doctor",
    // docAvtar:{
    //   public_id: cloudinaryResponse.public_id,
    //   url: cloudinaryResponse.secure_url
    // }
  });
  res.status(200).json({
    success: true,
    message: "New Doctor successfully Registered!",
    doctor,
  });
});
