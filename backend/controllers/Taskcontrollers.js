const Task = require('../model/Task.model');

const taskControllers = {
  createTask: async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.body.userId;

      // Validate input
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required fields.' });
      }

      const newTask = new Task({ title, description, userId });

      const savedTask = await newTask.save();
      res.status(201).json({ message: 'Task created successfully', task: savedTask });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTasks: async (req, res) => {
    try {
      const userId = req.body.userId;

      const tasks = await Task.find({ userId });
      res.json(tasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { title, description } = req.body;
      const taskId = req.params.taskId;
      const userId = req.body.user;

      // Validate input
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required fields.' });
      }

      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, userId },
        { title, description },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found or unauthorized.' });
      }

      res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const userId = req.body.user;

      const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

      if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found or unauthorized.' });
      }

      res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
};

module.exports = taskControllers;
