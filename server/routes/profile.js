const {
  getAllProfiles,
  getProfile,
  getCurrentUserProfile,
  createProfile,
  createExperience,
} = require("../controller/profile");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router
  .get("/", getAllProfiles)
  .get("/me", auth, getProfile)
  .get("/user/:id", getCurrentUserProfile)
  .post("/", auth, createProfile)
  .post("/experience", auth, createExperience);
module.exports = router;
