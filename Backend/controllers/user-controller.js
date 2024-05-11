const User = require('../models/User');
const customError = require('../utils/error');
const userController = {
    getUser: async(req,res)=>{
        const users = await User.find()
        return res.status(200).json({
            message : "Users fetched successfully",
            users
        })  
    },
    addUser : async(req,res)=>{
        const {name, password, authorities} = req.body;
        const newUser = await User.create({
            name,
            password,
            authorities
        })
        return res.status(200).json({
            message : "User added successfully"
        })
    },
    deleteUser : async (req,res) =>{
        const {userId} = req.params;

        const userExist = await User.findOne({_id : userId});
        if(!userExist)
            {
                throw new customError(404, "User not found")
            }

        const user = await User.findByIdAndDelete(userId);

        return res.status(200).json({
            message : "User deleted successfully",
        })

    },
    updateUser : async (req,res)=>{
        const {userId} = req.params;
        const userExist = await User.findOne({_id : userId});
        if(!userExist)
        {
            throw new customError(404, "User not exist")
        }
        const user = await User.findByIdAndUpdate(userId, req.body, {new : true});
        return res.status(200).json({
            message : "User updated successfully",
        })
    }
};

module.exports = userController;