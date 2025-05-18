const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) throw new Error("TOKEN NOT VALID");

    const decodedData = jwt.verify(token, "Magnifico@17011998");

    const { _id } = decodedData;

    const user = await User.findById(_id);
    console.log("USER",user)
    if (!user) {
      throw new Error("USER NOT FOUND");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports = { userAuth };
