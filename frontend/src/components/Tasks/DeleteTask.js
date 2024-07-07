import React from "react";
import { MdDelete } from "react-icons/md";
import styles from "./Task.module.css";

export default function DeleteTask({ taskId, onDelete }) {
  // Function to handle delete button click
  const handleDelete = () => {
    // Confirm deletion with user
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(taskId); // Call parent function to delete task
    }
  };

  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      <MdDelete /> {/* Delete icon */}
    </button>
  );
}
