// EditTask.js
import React, { useState } from "react";
import styles from "./Task.module.css";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTask({ task, onSave, onCancel }) {
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });

  const statusOptions = ["To Do", "In Progress", "Done"];

  const handleSave = () => {
    onSave(task._id, editedTask);
    toast.success("Task updated successfully!");
  };

  return (
    <div className={styles.taskCard}>
      <ToastContainer />
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
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className={`${styles.cardDescription} ${styles.editDescription}`}
        value={editedTask.description}
        onChange={(e) =>
          setEditedTask({ ...editedTask, description: e.target.value })
        }
      />
      <div className={styles.cardActions}>
        <button className={styles.saveButton} onClick={handleSave}>
          <FaSave />
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          <MdCancel />
        </button>
      </div>
    </div>
  );
}

 