const express = require("express");

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  forgetPassword,
  login,
  verifyCode,
  updatePassword,
} = require("./../controllers/userController");
const { getUserAudios } = require("./../controllers/audioController");
const router = express.Router();

// this is a clean code yala
router.route("/").get(getAllUsers).patch(updateUser).delete(deleteUser);

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgetPassword);
router.route("/verifyCode").post(verifyCode);
// Extract data from token
router.route("/audios").get(getUserAudios);
router.route("/updatePassword").patch(updatePassword);

module.exports = router;
