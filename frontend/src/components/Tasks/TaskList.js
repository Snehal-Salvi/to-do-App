import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Task.module.css"; // Import CSS modules styles
import AddTask from "./AddTask";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      // Optionally refetch tasks to update the list from the backend
      fetchTasks();

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className={styles.taskContainer}>
      <h2>Tasks</h2>
      <button variant="primary" onClick={handleShowModal}>
        Add Task
      </button>

      <AddTask show={showModal} handleClose={handleCloseModal} handleAddTask={handleAddTask} />
      
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task._id} className={styles.taskItem}>
            <Link to={`/tasks/${task._id}`} className={styles.taskLink}>
              <div className={styles.taskTitle}>{task.title}</div>
              <div className={styles.taskDescription}>{task.description}</div>
              <div className={styles.taskStatus}>{task.status}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
