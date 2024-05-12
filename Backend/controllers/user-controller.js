const User = require('../models/User');
const bcrypt = require("bcrypt")
const customError = require('../utils/error');
const jwt = require("jsonwebtoken")

const userController = {
    getUser: async (req, res) => {
        const users = await User.find()
        return res.status(200).json({
            message: "Users fetched successfully",
            users
        })
    },
    getAllUsernames: async (req, res) => {
        const query = {}
        const { role } = req.query
        if (role) {
            query.role = role
        }
        try {
            const users = await User.find(query, { name: 1, _id: 0 });
            const usernames = users.map(user => user.name);
            res.status(200).json(usernames);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    addUser: async (req, res) => {
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            res.status(409).json({ message: "User Already Exists" })
        }
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        if (user) {
            res.status(201).json({ message: "User successfully registered" });
        }
    },
    deleteUser: async (req, res) => {
        const { userId } = req.params;

        const userExist = await User.findOne({ _id: userId });
        if (!userExist) {
            throw new customError(404, "User not found")
        }

        const user = await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message: "User deleted successfully",
        })

    },
    updateUser: async (req, res) => {
        const { userId } = req.params;
        const userExist = await User.findOne({ _id: userId });
        if (!userExist) {
            throw new customError(404, "User not exist")
        }
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        return res.status(200).json({
            message: "User updated successfully",
        })
    },
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const Check = await User.findOne({ email });
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
    }
};

module.exports = userController;