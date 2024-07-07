import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";  

export default function AddTask({ show, handleClose, handleAddTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await handleAddTask(formData);
  
      // Clear the form fields after adding the task
      setFormData({
        title: "",
        description: "",
        status: "To Do",
      });
  
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
