import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Task.module.css";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { BiTask } from "react-icons/bi";
import { MdAddCard, MdModeEdit } from "react-icons/md";
import { Card } from "react-bootstrap";
import { BsClockFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from backend
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

  // Function to show the modal for adding a task
  const handleShowModal = () => setShowModal(true);

  // Function to close the modal for adding a task
  const handleCloseModal = () => setShowModal(false);

  // Function to add a new task
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

      fetchTasks(); // Refresh tasks after adding
      handleCloseModal(); // Close add task modal
      toast.success("Task added successfully!"); // Show success toast
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to handle editing a task
  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      fetchTasks(); // Refresh tasks after editing
      setSelectedTask(null); // Clear selected task after editing
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Function to handle deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks(); // Refresh tasks after deleting
      toast.success("Task deleted successfully!"); // Show success toast
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to handle clicking edit button for a task
  const handleEditButtonClick = (task) => {
    setSelectedTask(task); // Set selected task for editing
  };

  // Function to cancel editing a task
  const handleCancelEdit = () => {
    setSelectedTask(null); // Clear selected task for editing
  };

  return (
    <div className={styles.taskContainer}>
      <ToastContainer /> {/* Toast container for notifications */}
      <div className={styles.header}>
        <h2>
          {" "}
          <BiTask /> Taskly List
        </h2>
        <button className={styles.addButton} onClick={handleShowModal}>
          <MdAddCard style={{ margin: "5px" }} />
          Add Task
        </button>
      </div>

      {/* Modal for adding a task */}
      <AddTask
        show={showModal}
        handleClose={handleCloseModal}
        handleAddTask={handleAddTask}
      />

      <div className="row">
        {/* Displaying each task */}
        {tasks.map((task) => (
          <div key={task._id} className=" mb-4">
            <Card className={styles.taskCard}>
              <Card.Body>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>
                    {/* Conditionally rendering edit task form or task title */}
                    {selectedTask && selectedTask._id === task._id ? (
                      <EditTask
                        task={selectedTask}
                        onSave={handleEditTask}
                        onCancel={handleCancelEdit}
                      />
                    ) : (
                      <span>
                        <BiTask /> {task.title.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className={styles.cardStatus}>
                    <span>
                      <BsClockFill style={{ margin: "5px" }} /> {task.status}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    {/* Conditionally rendering edit and delete buttons */}
                    {!selectedTask || selectedTask._id !== task._id ? (
                      <>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditButtonClick(task)}
                        >
                          <MdModeEdit />
                        </button>
                        <DeleteTask
                          taskId={task._id}
                          onDelete={handleDeleteTask}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
                <div className={styles.cardDescription}>
                  <p>Description: {task.description}</p>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
