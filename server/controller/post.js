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
  const post = await Post.findOne({ user: req.params.id });
  if (!post) return res.status(404).json({ msg: "post not found" });
  res.json(post);
});

// route   DELETE /api/v1/post/:id
// @desc    delete post by id
// @access  Private
exports.deletePostById = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ user: req.params.id });
  if (!post) return res.status(404).json({ msg: "post not found" });
  if (post.user.toString() !== req.user.id)
    return res.status(401).json({ msg: "User Not Authorized" });
  await post.remove();
  res.json(post);
});
