const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  socials: {
    youtube: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      fieldofstudy: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String },
      current: { type: Boolean },
      date: { type: Date, default: Date.now },
    },
  ],
  experience: [
    {
      title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String },
      description: { type: String },
      current: { type: Boolean },
      date: { type: Date, default: Date.now },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
