import React from "react";
import { MdDelete } from "react-icons/md";
import styles from "./Task.module.css";

export default function DeleteTask({ taskId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(taskId);
    }
  };

  return (
    <button className={styles.deleteButton} onClick={handleDelete}>
      <MdDelete />
    </button>
  );
}
