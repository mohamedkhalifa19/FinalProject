const Audio = require("../models/audioModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
exports.getAllAudios = catchAsync(async (req, res, next) => {
  const audios = await Audio.find();
  res.status(200).json({
    status: "success",
    results: audios.length,
    data: {
      audios,
    },
  });
});
exports.getAudio = catchAsync(async (req, res, next) => {
  console.log(req.headers["authorization"]);
  // const decoded = await jwt.verify(token, secretKey);
  const audio = await Audio.findById(req.params.id);
  //Audio.findOne({_id: req.params.id})
  if (!audio) {
    return next(new AppError("No Audio found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      audio,
    },
  });
});
exports.createAudio = catchAsync(async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return next(new AppError("Token is required", 400));
    }
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const newAudio = await Audio.create({
      ...req.body,
      audio: req.file.filename,
      owner: user.id,
    });
    res.status(201).json({
      status: "success",
      data: {
        audio: newAudio,
      },
    });
  } catch (err) {
    console.log(err.name);
    if (err.name === "JsonWebTokenError")
      return next(new AppError("this Token is invalid", 400));
    return next(new AppError("You should upload an audio", 400));
  }
});
exports.updateAudio = catchAsync(async (req, res, next) => {
  const audio = await Audio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!audio) {
    return next(new AppError("No Audio found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      audio,
    },
  });
});
exports.deleteAudio = catchAsync(async (req, res, next) => {
  const audio = await Audio.findByIdAndDelete(req.params.id);
  if (!audio) {
    return next(new AppError("No Audio found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
// edit
exports.getUserAudios = catchAsync(async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(user);
  const audios = await Audio.find({
    owner: user.id,
  });
  res.status(200).json({
    status: "success",
    results: audios.length,
    data: {
      audios,
    },
  });
});
