const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const customError = require("../utils/error");


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmail = await Admin.findOne({ email });

  if (existingEmail) {
    throw new customError(409, "User already exists!");
  }
  const user = await Admin.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ message: "User successfully registered" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const Check = await Admin.findOne({ email });
    if (!Check) {
      throw new customError(404, "User not found");
    }
    const passwordCheck = await bcrypt.compare(password, Check.password);
    if (Check.email == email && passwordCheck) {
      const token = jwt.sign({ id: Check._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({ message: "Successful Login", token });
    } else {
      throw new customError(403, "Password or email is incorrect");
    }
  } catch (error) {
    console.error(error);
    console.log(process.env.SECRET_KEY)
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
