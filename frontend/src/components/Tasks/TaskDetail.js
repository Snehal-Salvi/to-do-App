import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Task.module.css";

export default function TaskDetail() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask(taskId);
  }, [taskId]);

  const fetchTask = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch task");
      }

      const taskData = await response.json();
      setTask(taskData);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.taskContainer}>
      <h2>{task.title}</h2>
      <div className={styles.taskDescription}>{task.description}</div>
      <div
        className={`${styles.taskStatus} ${styles[task.status.toLowerCase()]}`}
      >
        {task.status}
      </div>
      <Link to="/tasks" className={styles.backLink}>
        Back to Tasks
      </Link>
    </div>
  );
}
