const { getAuth, loginUser } = require("../controller/auth");
const { auth } = require("../middleware/authentication");

const router = require("express").Router();
router.get("/", auth, getAuth).post("/", loginUser);
module.exports = router;
