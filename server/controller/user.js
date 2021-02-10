const asyncHandler = require("../middleware/async");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../model/User");

// Method   Test
// @Desc    get appi/v1/post
// @Access  public

exports.getUser = (req, res) => {
  res.send("this is the test route");
};

// Method   POST
// @Desc    POST appi/v1/post
// @Access  public

exports.createUser = asyncHandler(async (req, res) => {
  await check("name", "please enter your name").not().isEmpty().run(req);
  await check("email", "please enter a valid email").isEmail().run(req);
  await check("password", "password must contain at least 6 character")
    .isLength({ min: 6 })
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res
      .status(404)
      .json({ errors: [{ msg: "email is being used by another user" }] });
  const avatar = gravatar.url("email", { s: "200", r: "pg", d: "mm" });
  const newUser = { name, email, password, avatar };
  user = await User.create(newUser);
  user.password = await bcrypt.hash(password, 10);

  await user.save();
  console.log(user);
  const payload = { user: { id: user.id } };
  jsonwebtoken.sign(
    payload,
    process.env.TOKEN,
    { expiresIn: 460000 },
    (err, token) => {
      if (err) throw err;
      return res.json({ token });
    }
  );
});
