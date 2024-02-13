const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const audioRouter = require("./routes/audioRoutes");
const AppError = require("./utils/appError");
const gloalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

const app = express();
//middlewares

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/audios", audioRouter);
app.use(express.static("./uploads"));
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(gloalErrorHandler);
module.exports = app;

// Updated
