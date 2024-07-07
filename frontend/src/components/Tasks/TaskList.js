import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../../utils/constants";
import styles from "./Task.module.css";  
import AddTask from "./AddTask";
import { BiTask } from "react-icons/bi";
import { MdAddCard } from "react-icons/md";
import { Card } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";

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

      fetchTasks();

      handleCloseModal();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className={styles.taskContainer}>
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
                    <BiTask /> {task.title.toUpperCase()}
                  </div>
                  <div className={styles.cardStatus}>
                    <span><BsClockFill style={{ margin: "5px" }}/> {task.status}</span>
                  </div>

                  <div className={styles.cardActions}>
                    <button className={styles.editButton}>
                      <MdModeEdit />
                    </button>
                    <button className={styles.deleteButton}>
                      <MdDelete />
                    </button>
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
