const {
  getAllProfiles,
  getProfile,
  getCurrentUserProfile,
  createProfile,
} = require("../controller/profile");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router
  .get("/", getAllProfiles)
  .get("/me", auth, getProfile)
  .get("/user/:id", getCurrentUserProfile)
  .post("/", auth, createProfile);
module.exports = router;
