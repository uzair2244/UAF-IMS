const Task = require("../models/Task")
const customError = require("../utils/error");

const taskController = {
  addTask: async (req, res) => {
    const { title, worker, description } = req.body
    const newTask = await Task.create({
      title,
      worker,
      description
    })
    if (newTask) {
      return res.status(200).json({ message: "Task inserted successfully!" });
    }
  },
  getTasks: async (req, res) => {
    const tasks = await Task.find()
    if (tasks) {
      res.status(200).json({ message: "All tasks are fetched", tasks })
    } else {
      throw new customError(500, "Something went wrong!");
    }
  },
  deleteTask: async (req, res) => {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (task) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      throw new customError(500, "Something went wrong!");
    }
  },
  completeTask: async (req, res) => {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, { status: "success" });
    if (task) {
      res.status(200).json({ message: "Task Completed successfully" });
    } else {
      throw new customError(500, "Something went wrong!");
    }
  },
}

module.exports = taskController;