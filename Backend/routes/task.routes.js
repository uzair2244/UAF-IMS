const taskController = require("../controllers/task-controller")
const { checkAdmin } = require("../middlewares/checkUserRole")

const router = require('express').Router();

router.get("/", taskController.getTasks)

router.post("/", taskController.addTask)

router.delete("/:id", checkAdmin, taskController.deleteTask)

router.put("/:id", checkAdmin, taskController.completeTask)

module.exports = router