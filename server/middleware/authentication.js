const jsonwebtoken = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "authentication failed, no token" });
    const decoded = jsonwebtoken.verify(token, process.env.TOKEN);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "invalid token" });
  }
};
