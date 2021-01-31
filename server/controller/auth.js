const { check, validationResult } = require("express-validator");
const asyncHandler = require("../middleware/async");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// method   GET
// @desc    GET /api/v1/auth
// @access  private
exports.getAuth = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user)
    return res.status(400).json({ errors: [{ msg: "user do not exist" }] });
  res.json(user);
});

// method   POST
// @desc    POST /api/v1/auth
// @access  public
exports.loginUser = asyncHandler(async (req, res) => {
  await check("email", "enter a valid email").isEmail().run(req);
  await check("password").exists().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user)
    return res
      .status(400)
      .json({ errors: [{ msg: "invalid credentials, enter a valid email" }] });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({
      errors: [{ msg: "invalid credentials, enter a valid password" }],
    });

  const payload = { user: { id: user.id } };
  jwt.sign(payload, process.env.TOKEN, { expiresIn: 46000 }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});
