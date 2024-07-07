import Task from '../models/task.model.js';  
import { errorHandler } from '../middleware/errorHandler.js';  

// Create a new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body; // Extracting title, description, and status from request body
    const userId = req.user._id;  

    const newTask = new Task({
      title,
      description,
      status,
      user: userId, // Assigning current user's ID to the new task
    });

    await newTask.save(); // Saving the new task to the database
    res.status(201).json({ message: 'Task created successfully', task: newTask }); // Responding with success message and created task details
  } catch (error) {
    next(error); 
  }
};

// Get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const userId = req.user._id; 
    const tasks = await Task.find({ user: userId }); // Finding all tasks belonging to the current user
    res.status(200).json(tasks); // Responding with tasks
  } catch (error) {
    next(error); 
  }
};

// Get a single task by ID
export const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id; // Extracting task ID from request parameters
    const userId = req.user._id; 

    const task = await Task.findOne({ _id: taskId, user: userId }); // Finding a task by ID and user ID
    if (!task) {
      throw errorHandler(404, 'Task not found'); // Throwing an error if task is not found
    }

    res.status(200).json(task); // Responding with the found task
  } catch (error) {
    next(error); 
  }
};

// Update a task by ID
export const updateTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id; // Extracting task ID from request parameters
    const { title, description, status } = req.body; // Extracting updated title, description, and status from request body
    const userId = req.user._id; 

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId }, // Finding and updating a task by ID and user ID
      { title, description, status }, // Updated task fields
      { new: true } // Returning the updated document
    );

    if (!updatedTask) {
      throw errorHandler(404, 'Task not found or user unauthorized to update'); // Throwing an error if task is not found or user is unauthorized
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask }); // Responding with success message and updated task details
  } catch (error) {
    next(error); 
  }
};

// Delete a task by ID
export const deleteTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id; // Extracting task ID from request parameters
    const userId = req.user._id; 

    const deletedTask = await Task.findOneAndDelete({ _id: taskId, user: userId }); // Finding and deleting a task by ID and user ID

    if (!deletedTask) {
      throw errorHandler(404, 'Task not found or user unauthorized to delete'); // Throwing an error if task is not found or user is unauthorized
    }

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask }); // Responding with success message and deleted task details
  } catch (error) {
    next(error); 
  }
};
