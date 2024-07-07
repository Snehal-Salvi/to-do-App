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

      fetchTasks();
      handleCloseModal();
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

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

      fetchTasks();
      setSelectedTask(null); // Clear selected task after editing
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

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

      fetchTasks();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditButtonClick = (task) => {
    setSelectedTask(task);
  };

  const handleCancelEdit = () => {
    setSelectedTask(null);
  };

  return (
    <div className={styles.taskContainer}>
      <ToastContainer />
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

      <AddTask
        show={showModal}
        handleClose={handleCloseModal}
        handleAddTask={handleAddTask}
      />

      <div className="row">
        {tasks.map((task) => (
          <div key={task._id} className=" mb-4">
            <Card className={styles.taskCard}>
              <Card.Body>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>
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
