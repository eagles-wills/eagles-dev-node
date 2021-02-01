const {
  getAllProfiles,
  getProfile,
  getCurrentUserProfile,
  createProfile,
  createExperience,
  deleteExperience,
  createEducation,
  deleteEducation,
} = require("../controller/profile");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router
  .get("/", getAllProfiles)
  .get("/me", auth, getProfile)
  .get("/user/:id", getCurrentUserProfile)
  .post("/", auth, createProfile)
  .post("/experience", auth, createExperience)
  .delete("/experience/:exp_id", auth, deleteExperience)
  .post("/education", auth, createEducation)
  .delete("/education/:edu_id", auth, deleteEducation);
module.exports = router;
