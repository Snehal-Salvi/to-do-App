import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from '../controllers/task.controller.js';

const router = express.Router();

// Route to create a new task
router.post('/tasks', createTask);

// Route to get all tasks
router.get('/tasks', getAllTasks);

// Route to get a single task by ID
router.get('/tasks/:id', getTaskById);

// Route to update a task by ID
router.put('/tasks/:id', updateTaskById);

// Route to delete a task by ID
router.delete('/tasks/:id', deleteTaskById);

export default router;
