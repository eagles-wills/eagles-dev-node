const { check, validationResult } = require("express-validator");
const asyncHandler = require("../middleware/async");
const Post = require("../model/Post");
const User = require("../model/User");

// route   POST /api/v1/post
// @desc    create a new post
// @access  Private
exports.createPost = asyncHandler(async (req, res) => {
  await check("text", "text field cannot be empty").not().isEmpty().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const user = await User.findById(req.user.id).select("-password");
  const newPost = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  };
  const post = await Post.create(newPost);
  await post.save();
  res.json(post);
});

// route   GET /api/v1/post/me
// @desc    get post by the current user
// @access  Private

exports.getUserPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ user: req.user.id });
  if (!post) return res.status(400).json({ msg: "no post by this user" });
  res.json(post);
});

// route   GET /api/v1/post
// @desc    get post
// @access  Private
exports.getPost = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});
// route   GET /api/v1/post/:id
// @desc    get post by id
// @access  Private
exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ msg: "post not found" });
  res.json(post);
});

// route   DELETE /api/v1/post/:id
// @desc    delete post by id
// @access  Private
exports.deletePostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  console.log(post);
  if (!post) return res.status(404).json({ msg: "post not found" });
  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "User Not Authorized" });
  await post.remove();
  res.json({ msg: "post removed" });
});

// route   Put /api/v1/post/likes/:id
// @desc    put post by id
// @access  Private
exports.likePosts = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  )
    return res.status(400).json({ msg: "post already liked by this user" });
  post.likes.unshift({ user: req.user.id });
  await post.save();
  res.json(post.likes);
});
// route   Put /api/v1/post/unlike/:id
// @desc    put post by id
// @access  Private
exports.unlikePosts = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  )
    return res.status(400).json({ msg: "post yet to be liked by this user" });
  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);
  post.likes.splice(removeIndex, 1);
  await post.save();
  res.json(post.likes);
});

// route   COMMENT /api/v1/post/comment/:id
// @desc    comment on a post
// @access  Private
exports.createComment = asyncHandler(async (req, res) => {
  await check("text", "text field cannot be empty").not().isEmpty().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const user = await User.findById(req.user.id).select("-password");
  const post = await Post.findById(req.params.id);

  const newComment = {
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  };
  post.comments.unshift(newComment);
  await post.save();
  res.json(post.comments);
});
// route   DELETE /api/v1/post/comment/:id/:comment_id
// @desc    delete comment on a post
// @access  Private
exports.deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  //   pull out the comment
  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );
  if (!comment) return res.status(404).json({ msg: "comment does not exists" });
  if (comment.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "user not authorized" });
  const removeIndex = post.comments
    .map((comment) => comment.id)
    .indexOf(req.params.id);
  post.comments.splice(removeIndex, 1);
  await post.save();
  res.json(post.comments);
});
