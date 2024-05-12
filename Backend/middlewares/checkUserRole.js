const User = require("../models/User");

const checkAdmin = async (req, res, next) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  if (user.role == "admin") {
    next();
    return;
  } else {
    res.status(403).json({
      message: "Only Admin can perform this action",
    });
  }
};
const checkManagement = async (req, res, next) => {
  const id = req.id;
  const user = await User.findOne({ _id: id });
  if (user.role == "management") {
    next();
    return;
  } else {
    res.status(403).json({
      message: "You are not Authorized",
    });
  }
};

module.exports = { checkAdmin, checkManagement };
