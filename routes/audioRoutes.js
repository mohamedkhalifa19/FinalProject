const express = require("express");

const {
  getAllAudios,
  createAudio,
  getAudio,
  updateAudio,
  getUserAudios,
  deleteAudio,
} = require("./../controllers/audioController");

const router = express.Router();
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const exe = file.mimetype.split("/")[1];
    const filename = `audio-${Date.now()}.${exe}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: diskStorage });
router.route("/").get(getAllAudios).post(upload.single("audio"), createAudio);

router.route("/:id").get(getAudio).patch(updateAudio).delete(deleteAudio);

module.exports = router;
