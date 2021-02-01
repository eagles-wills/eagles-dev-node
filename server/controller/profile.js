const { check, validationResult, body } = require("express-validator");
const asyncHandler = require("../middleware/async");
const Profile = require("../model/Profile");
const request = require("request");
const User = require("../model/User");
// route   GET
// @desc    GET /api/v1/profile
// @access  public
exports.getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  if (!profiles) return res.status(400).json({ msg: "no profiles yet" });
  res.json(profiles);
});

// route   GET
// @desc    GET /api/v1/profile/me
// @access  private
exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    ["name", "avatar"]
  );
  if (!profile)
    return res.status(400).json({ msg: "no profile for this user" });
  res.json(profile);
});

// route   GET
// @desc    GET /api/v1/profile/user/:id
// @access  private
exports.getCurrentUserProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    user: req.params.id,
  }).populate("user", ["name", "avatar"]);
  if (!profile)
    return res.status(400).json({ msg: "no profile for this user" });
  res.json(profile);
});

// route   POST
// @desc    POST /api/v1/profile
// @access  private

exports.createProfile = asyncHandler(async (req, res) => {
  await check("skills", "please enter at least one skill")
    .not()
    .isEmpty()
    .run(req);
  await check("status", "please enter at least one status")
    .not()
    .isEmpty()
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    company,
    website,
    location,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    facebook,
    instagram,
    twitter,
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (githubusername) profileFields.githubusername = githubusername;
  if (status) profileFields.status = status;
  if (skills)
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  profileFields.socials = {};
  if (youtube) profileFields.socials.youtube = youtube;
  if (facebook) profileFields.socials.facebook = facebook;
  if (twitter) profileFields.socials.twitter = twitter;
  if (instagram) profileFields.socials.instagram = instagram;
  let profile = await Profile.findOne({ user: req.user.id }).populate("user", [
    "name",
    "avatar",
  ]);

  if (profile)
    return await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
  profile = await Profile.create(profileFields);
  profile.save();
  res.json(profile);
});

// route   POST
// @desc    POST /api/v1/profile/experience
// @access  private

exports.createExperience = asyncHandler(async (req, res) => {
  await check("company", "company is required").not().isEmpty().run(req);
  await check("title", "title is required").not().isEmpty().run(req);
  await check("location", "location is required").not().isEmpty().run(req);
  await check("from", "from is required").not().isEmpty().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { company, title, location, from, to, description } = req.body;
  let profile = await Profile.findOne({ user: req.user.id }).populate("user", [
    "name",
    "avatar",
  ]);
  let newExp = { company, title, location, from, to, description };
  profile.experience.unshift(newExp);
  await profile.save();
  res.json(profile);
});
// route   DELETE
// @desc    DELETE /api/v1/profile/experience/:exp_id
// @access  private

exports.deleteExperience = asyncHandler(async (req, res) => {
  let profile = await (
    await Profile.findOne({ user: req.user.id })
  ).populate("user", ["name, avatar"]);
  const removeIndex = profile.experience
    .map((item) => item.id)
    .indexOf(req.params.exp_id);
  profile.experience.splice(removeIndex, 1);
  await profile.save();
  res.json(profile);
});
// route   POST
// @desc    POST /api/v1/profile/education
// @access  private

exports.createEducation = asyncHandler(async (req, res) => {
  await check("school", "school is required").not().isEmpty().run(req);
  await check("degree", "degree is required").not().isEmpty().run(req);
  await check("fieldofstudy", "field of study is required")
    .not()
    .isEmpty()
    .run(req);
  await check("from", "from is required").not().isEmpty().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { school, degree, fieldofstudy, from, to } = req.body;
  let profile = await Profile.findOne({ user: req.user.id }).populate("user", [
    "name",
    "avatar",
  ]);
  let newExp = { school, degree, fieldofstudy, from, to };
  profile.education.unshift(newExp);
  await profile.save();
  res.json(profile);
});
// route   DELETE
// @desc    DELETE /api/v1/profile/education/:edu_id
// @access  private

exports.deleteEducation = asyncHandler(async (req, res) => {
  let profile = await (
    await Profile.findOne({ user: req.user.id })
  ).populate("user", ["name, avatar"]);
  const removeIndex = profile.education
    .map((item) => item.id)
    .indexOf(req.params.exp_id);
  profile.education.splice(removeIndex, 1);
  await profile.save();
  res.json(profile);
});

// route   GET
// @desc    GET /api/v1/profile/github/:username
// @access  public

exports.githubUsers = asyncHandler(async (req, res) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };
  request(options, (error, response, body) => {
    if (error) console.error(error);
    if (response.statusCode !== 200)
      return res.status(404).json({ msg: "No Github Profile Found" });
    res.json(JSON.parse(body));
  });
});

exports.deleteProfile = asyncHandler(async (req, res) => {
  // delete post
  // delete profile
  await Profile.findOneAndDelete({ user: req.user.id });
  // delete user
  await User.findOneAndDelete({ _id: req.user.id });
  res.json({ msg: "user account deleted" });
});
