const {
  createPost,
  getUserPost,
  getPost,
  getPostById,
} = require("../controller/post");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router
  .post("/", auth, createPost)
  .get("/me", auth, getUserPost)
  .get("/", auth, getPost)
  .get("/:id", auth, getPostById);
module.exports = router;
