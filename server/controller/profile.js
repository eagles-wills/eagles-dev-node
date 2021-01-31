const { check, validationResult } = require("express-validator");
const asyncHandler = require("../middleware/async");
const Profile = require("../model/Profile");

// method   GET
// @desc    GET /api/v1/profile
// @access  public
exports.getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find().populate("user", ["name", "avatar"]);
  if (!profiles) return res.status(400).json({ msg: "no profiles yet" });
  res.json(profiles);
});

// method   GET
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

// method   GET
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

// method   POST
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
