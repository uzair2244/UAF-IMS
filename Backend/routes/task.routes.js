const taskController = require("../controllers/task-controller")

const router = require('express').Router();

router.get("/", taskController.getTasks)

router.post("/", taskController.addTask)

router.delete("/:id", taskController.deleteTask)

router.put("/:id", taskController.completeTask)

module.exports = router