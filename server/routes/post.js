const {
  createPost,
  getUserPost,
  getPost,
  getPostById,
  deletePostById,
} = require("../controller/post");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router
  .post("/", auth, createPost)
  .get("/me", auth, getUserPost)
  .get("/", auth, getPost)
  .get("/:id", auth, getPostById)
  .delete("/:id", auth, deletePostById);
module.exports = router;
