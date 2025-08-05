# Task Manager API

A simple and lightweight RESTful API for managing a list of tasks, built with Node.js and Express. This application uses in-memory storage, meaning tasks will be reset every time the server restarts.

## Features

-   **Create, Read, Update, Delete (CRUD)** operations for tasks.
-   Get all tasks or filter them by completion status.
-   Get a specific task by its unique ID.
-   Get tasks by priority level (`low`, `medium`, `high`).
-   In-memory data storage for simplicity and speed.
-   Structured routing and controller logic.
-   Standardized JSON response format for success and error handling.

## Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.0.0 or higher)
-   npm (comes with Node.js)

## Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/airtribe-projects/task-manager-api-KIRAN-MISKIN.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd task-manager-api
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

## Running the Application

To start the server in development mode with live-reloading (using nodemon), run:

```sh
npm run dev
```

The server will start and listen for requests on `http://localhost:3000`.

## Running Tests

To run the automated tests for the API endpoints, use the following command:

```sh
npm run test
```

## API Endpoints

All endpoints are prefixed with `/api/v1/tasks`.

| Method | Endpoint                     | Description                                            | Request Body                                                              |
| :----- | :--------------------------- | :----------------------------------------------------- | :------------------------------------------------------------------------ |
| `GET`  | `/`                          | Get all tasks. Can be filtered by `?completed=true` or `?completed=false`. | None                                                                      |
| `GET`  | `/:id`                       | Get a single task by its ID.                           | None                                                                      |
| `GET`  | `/priority/:level`           | Get all tasks matching a priority level (`low`, `medium`, or `high`). | None                                                                      |
| `POST` | `/`                          | Create a new task.                                     | `{ "title": "string", "description": "string", "completed": boolean, "priority": "string" (optional) }` |
| `PUT`  | `/:id`                       | Update an existing task by its ID.                     | `{ "title": "string", "description": "string", "completed": boolean, "priority": "string" (optional) }` |
| `DELETE`| `/:id`                       | Delete a task by its ID.                               | None                                                                      |

### Task Object Structure

A task object has the following structure:

```json
{
  "id": 1,
  "title": "Example Title",
  "description": "A description of the task.",
  "completed": false,
  "priority": "Low"
}
```

-   `id` (number): A unique identifier for the task.
-   `title` (string): The title of the task.
-   `description` (string): A detailed description of the task.
-   `completed` (boolean): The completion status of the task.
-   `priority` (string, optional): The priority level (`Low`, `Medium`, `High`).

## Project Structure

```
.
├── app.js               # Main application entry point
├── server.js                  # Running Dev Server at port 3000
├── package.json            # Project metadata and dependencies
├── controller/             # Contains the logic for handling requests
│   ├── createTask.js
│   ├── deleteTask.js
│   ├── getAllTasks.js
│   ├── getTasksById.js
│   ├── getTaskByPriority.js
│   └── updateByTaskId.js
├── model/                  # Data storage logic (in-memory)
│   └── localmemory.js
├── router/                 # Defines API routes
│   └── tasksrouter.js
├── test/                   # API tests
│   └── server.test.js
└── utils/                  # Utility functions
    └── responseHandler.js
