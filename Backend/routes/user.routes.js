const userController = require('../controllers/user-controller');

const router = require('express').Router();

router.get("/", userController.getUser)

router.post("/",userController.addUser)

router.delete("/delete/:userId",userController.deleteUser)

router.put("/update/:userId",userController.updateUser)


const userRouter = router;

module.exports = userRouter