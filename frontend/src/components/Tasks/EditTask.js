import React, { useState } from "react";
import styles from "./Task.module.css";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTask({ task, onSave, onCancel }) {
  // State to manage edited task details
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  // Options for task status
  const statusOptions = ["To Do", "In Progress", "Done"];

  // Function to handle save button click
  const handleSave = () => {
    onSave(task._id, editedTask); // Call parent function to save edited task
    toast.success("Task updated successfully!"); // Show success toast notification
  };

  return (
    <div className={styles.taskCard}>
      <ToastContainer />
      {/* Editable task title and status */}
      <div className={styles.cardHeader}>
        <input
          type="text"
          className={`${styles.cardTitle} ${styles.editInput}`}
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
        />
        <select
          value={editedTask.status}
          onChange={(e) =>
            setEditedTask({ ...editedTask, status: e.target.value })
          }
          className={`${styles.cardStatus} ${styles.editSelect}`}
        >
          {/* Dropdown options for task status */}
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* Editable task description */}
      <textarea
        className={`${styles.cardDescription} ${styles.editDescription}`}
        value={editedTask.description}
        onChange={(e) =>
          setEditedTask({ ...editedTask, description: e.target.value })
        }
      />
      {/* Buttons to save or cancel editing */}
      <div className={styles.cardActions}>
        <button className={styles.saveButton} onClick={handleSave}>
          <FaSave /> {/* Save icon */}
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          <MdCancel /> {/* Cancel icon */}
        </button>
      </div>
    </div>
  );
}
