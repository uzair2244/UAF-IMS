const taskController = require("../controllers/task-controller")
const { checkAdmin } = require("../middlewares/checkUserRole")

const router = require('express').Router();

router.get("/:id", taskController.getTasks)

router.get("/pending/:id", taskController.getPending)

router.post("/", taskController.addTask)

router.delete("/:id", taskController.deleteTask)

router.put("/:id", taskController.completeTask)

module.exports = router