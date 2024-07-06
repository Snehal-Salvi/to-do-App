import Task from '../models/task.model.js';
import { errorHandler } from '../middleware/errorHandler.js';

// Create a new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user._id; // Assuming req.user._id is set by your verifyToken middleware

    const newTask = new Task({
      title,
      description,
      status,
      user: userId,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    next(error);
  }
};

// Get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming req.user._id is set by your verifyToken middleware
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get a single task by ID
export const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id; // Assuming req.user._id is set by your verifyToken middleware

    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw errorHandler(404, 'Task not found');
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// Update a task by ID
export const updateTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const userId = req.user._id; // Assuming req.user._id is set by your verifyToken middleware

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      throw errorHandler(404, 'Task not found or user unauthorized to update');
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    next(error);
  }
};

// Delete a task by ID
export const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id; // Assuming req.user._id is set by your verifyToken middleware

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!deletedTask) {
      throw errorHandler(404, 'Task not found or user unauthorized to delete');
    }

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    next(error);
  }
};
