const {
  createPost,
  getUserPost,
  getPost,
  getPostById,
  deletePostById,
  likePosts,
  unlikePosts,
  createComment,
  deleteComment,
} = require("../controller/post");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router
  .post("/", auth, createPost)
  .get("/me", auth, getUserPost)
  .get("/", auth, getPost)
  .get("/:id", auth, getPostById)
  .delete("/:id", auth, deletePostById)
  .put("/likes/:id", auth, likePosts)
  .put("/unlikes/:id", auth, unlikePosts)
  .put("/comment/:id", auth, createComment)
  .delete("/comment/:id/:comment_id", auth, deleteComment);
module.exports = router;
