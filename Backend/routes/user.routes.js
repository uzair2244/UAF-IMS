const userController = require('../controllers/user-controller');
const { checkAdmin, checkManagement } = require("../middlewares/checkUserRole")

const router = require('express').Router();

router.get("/", userController.getUser)

router.post("/login", userController.loginUser)

router.get("/usernames", userController.getAllUsernames)

router.post("/", userController.addUser)

router.delete("/delete/:userId", userController.deleteUser)

router.put("/update/:userId", userController.updateUser)

const userRouter = router;

module.exports = userRouter