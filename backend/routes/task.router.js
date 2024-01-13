const express = require('express');
const taskrouter = express.Router();

const { auth } = require('../middleware/Auth.middleware');
const taskControllers = require('../controllers/Taskcontrollers');


// Task Routes
taskrouter.post('/tasks', auth, taskControllers.createTask);
taskrouter.get('/tasks', auth, taskControllers.getTasks);
// taskrouter.get('/allUsersTask', taskControllers.getAllUsersTasks);
taskrouter.put('/tasks/:taskId', auth, taskControllers.updateTask);
taskrouter.delete('/tasks/:taskId', auth, taskControllers.deleteTask);

module.exports = {taskrouter};
