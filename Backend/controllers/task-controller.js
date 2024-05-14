const Task = require("../models/Task")
const User = require("../models/User")
const customError = require("../utils/error");

const taskController = {
  addTask: async (req, res) => {
    const { title, user, assigner, description } = req.body
    const newTask = await Task.create({
      title,
      user,
      assigner,
      description
    })
    if (newTask) {
      return res.status(200).json({ message: "Task inserted successfully!" });
    }
  },
  getTasks: async (req, res) => {
    const user = await User.findById(req.params.id)
    let query = {}
    if (user.role === "admin" || user.role === "management") {
      const tasks = await Task.find(query)
      if (tasks) {
        res.status(200).json({ message: "All tasks are fetched", tasks })
      } else {
        throw new customError(500, "Something went wrong!");
      }
    }
    else {
      query = { assigner: req.params.id }
      const tasks = await Task.find(query)
      if (tasks) {
        res.status(200).json({ message: "All tasks are fetched", tasks })
      } else {
        throw new customError(500, "Something went wrong!");
      }
    }
  },
  getPending: async (req, res) => {
    const user = await User.findById(req.params.id)
    let query = { status: "pending" }
    if (user.role === "admin" || user.role === "management") {
      const tasks = await Task.find(query)
      if (tasks) {
        res.status(200).json({ message: "All tasks are fetched", tasks })
      } else {
        throw new customError(500, "Something went wrong!");
      }
    }
    else {
      query.assigner = req.params.id
      const tasks = await Task.find(query)
      if (tasks) {
        res.status(200).json({ message: "All tasks are fetched", tasks })
      } else {
        throw new customError(500, "Something went wrong!");
      }
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