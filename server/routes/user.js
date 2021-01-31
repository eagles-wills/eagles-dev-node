const { getUser, createUser } = require("../controller/user");

const router = require("express").Router();
router.get("/", getUser).post("/", createUser);

module.exports = router;
