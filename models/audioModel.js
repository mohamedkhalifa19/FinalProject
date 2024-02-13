const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    default: `audio-${Date.now()}`,
    minlength: [3, "audio title should be at least 3 charaters"],
  },
  audio: {
    type: String,
  },
  owner: {
    type: String,
  },
  transcriptionText: { type: String, default: "" },
  duration: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Audio = mongoose.model("Audio", audioSchema);

module.exports = Audio;
