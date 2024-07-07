# 💼 Taskly (Backend )

This is a backend application for a real-time chat system built with Express.js, Socket.io, and MongoDB.

## 🛠️ Installation

To run this project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory:
3. Install the necessary dependencies:

```
npm install
```

4. Set up environment variables.

```
PORT=3002
DB_URL=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_jwt_secret_key
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password

```

5. Run the project.

```
node index.js
```

6. The server will start running on http://localhost:3002.

## 📝 API Routes

## Register a new user

- **URL:** `/api/user/register`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password"
  }
  ```

- **Description:** Registers a new user with the provided name, email, and password.

## Login user

- **URL:** `/api/user/login`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password"
  }
  ```

## Forgot password - Request OTP

- **URL:** `/api/user/forgot-password`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "email": "john.doe@example.com"
  }
  ```

- **Description:** Sends a one-time password (OTP) to the user's email for resetting their password.

## Reset password using OTP

- **URL:** `/api/user/reset-password`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "email": "john.doe@example.com",
    "otp": "123456",
    "newPassword": "newpassword"
  }
  ```

- **Description:** Resets the user's password using the provided OTP and sets a new password.

## Create a new task

- **URL:** `/api/tasks`
- **Method:** `POST`
- **Body:**

  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "To Do"
  }
  ```

- **Description:** Creates a new task associated with the authenticated user.

## Get all tasks

- **URL:** `/api/tasks`
- **Method:** `GET`
- **Description:** Retrieves all tasks belonging to the authenticated user.

## Get a task by ID

- **URL:** `/api/tasks/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific task by its ID, if it belongs to the authenticated user.

## Update a task by ID

- **URL:** `/api/tasks/:id`
- **Method:** `PUT`
- **Body:**

  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "In Progress"
  }
  ```

- **Description:** Updates an existing task identified by its ID, if it belongs to the authenticated user.

## Delete a task by ID

- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`
- **Description:** Deletes a specific task by its ID, if it belongs to the authenticated user.

## Technologies Used

- Node JS
- Express.js
- Mongoose
- MongoDB
- bcryptjs
- jsonwebtoken (JWT):
- Nodemailer

## 👩‍💻 Authors

- [@Snehal](https://github.com/Snehal-Salvi)
