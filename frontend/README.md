# 💼 Taskly App (Frontend )

Taskly is a task management application built using React.js and integrated with a backend API for managing tasks.

## 🚀 Features

- **User Authentication:**
  - Sign up, sign in, forgot password, reset password.
  - Private routes for authenticated users.
- **Task Management:**
  - Create, read, update, delete tasks.
  - Task status management (To Do, In Progress, Done).

## 🛠️ Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory:
3. Install the necessary dependencies:

```
npm install
```

4. Run the project.

```
npm start
```

5. The app will start running on http://localhost:3000.

## 🧩 Components

### 🔐 Authentication Components

#### Signup

- Render a form for user registration.
- Handle form submission to create a new user via the backend API.

#### Signin

- Render a form for user login.
- Handle user authentication via the backend API.

#### ForgotPassword

- Render a form to request a password reset.
- Handle form submission to send a reset link to the user's email.

#### ResetPassword

- Render a form to reset the user's password.
- Handle form submission to update the user's password in the backend.

### 📝 Task Management Components

#### Task List

- Fetch tasks from the backend and display them.
- Implement functionality to add, edit, and delete tasks using AddTask, EditTask, and DeleteTask components.

#### Add Task

- Display a modal form to add new tasks.
- Handle form submission to create tasks via the backend API.

#### Edit Task

- Render an editable form for modifying task details.
- Update task information and save changes through interactions.

#### Delete Task

- Provide a button to delete tasks.
- Confirm task deletion with a dialog before proceeding.

## 🛠️ Technologies Used

- React.js
- React Router
- React Bootstrap
- FontAwesome for icons
- Axios for API requests
- react-toastify for notifications

## 👩‍💻 Authors

- [@Snehal](https://github.com/Snehal-Salvi)
