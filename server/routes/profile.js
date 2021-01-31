const {
  getAllProfiles,
  getProfile,
  getCurrentUserProfile,
  createProfile,
  createExperience,
  deleteExperience,
} = require("../controller/profile");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router
  .get("/", getAllProfiles)
  .get("/me", auth, getProfile)
  .get("/user/:id", getCurrentUserProfile)
  .post("/", auth, createProfile)
  .post("/experience", auth, createExperience)
  .delete("/experience/:exp_id", auth, deleteExperience);
module.exports = router;
