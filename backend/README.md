# Task Management App Backend

This project is the backend API for a task management application. It provides endpoints for user registration, authentication, task creation, updating, and deletion, as well as user profile management.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** (Assuming you are using MongoDB based on the provided code)
- **Cors** (for handling Cross-Origin Resource Sharing)
- **JWT Token** (User Authentication)
- **Cookie-parser** (for handling cookies)
-  bcrypt for password hashing
## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB Atlas account or local MongoDB instance
- Other dependencies specified in `package.json`

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository:

    ```bash
    git clone  Prashantrathour/greenmentor
    ```

2. Install dependencies:

    ```bash
    cd greenmentor
    npm install
    ```

3. Configure environment variables:

   Create a `.env` file in the root directory and provide the necessary variables, such as:

    ```env
    port=8080
    mongoURL=<your_mongodb_uri>
    secret=<your_jwt_secret>
    refreshSecret=<your_jwt_secret>
    ```

4. Run the application:

    ```bash
    npm run server
    ```

    The server will be running at `http://localhost:8080` or the specified port.

## Project Structure

Briefly explain the structure of your project. Highlight key directories and files.

## API Endpoints

Describe the available API endpoints, including their routes, methods, and required parameters.

### Example:

- **POST /users/register**
  - Registers a new user.
  - Requires a JSON payload with `name`, `email`, `password`
  - Returns a success message or error.

- **POST /users/login**
  - Logs in a user.
  - Requires a JSON payload with `email` and `password`.
  - Returns a JWT token on successful login.
  - 

- **POST /users/logout**
  - Logs out a user.
  - Requires a valid JWT token.
  - Invalidates the token.
- **Create profile**  
  - GET /users/profile - Get the user's profile(requires authentication)
  - PUT /users/profile - Edit the user's profile(requires authentication)
- **Task Management**
  - POST /api/tasks - Create a new task (requires authentication)
  - GET /api/tasks - Get all tasks for the authenticated user
  - PUT /api/tasks/:taskId - Update a task (requires authentication)
  - DELETE /api/tasks/:taskId - Delete a task (requires authentication)  


## License

Specify the license under which your project is distributed.

## Acknowledgments

Acknowledge any libraries, tools, or contributors that you want to credit.

