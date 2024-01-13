# Backend README

This is the backend for login And Register user, built with Node.js, Express, MongoDB, Mongoose, JWT authentication, and bcrypt.

## Project Overview

Briefly describe the purpose and functionality of your project.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- MongoDB Atlas account or local MongoDB instance
- Other dependencies specified in `package.json`

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    cd <project_directory>
    npm install
    ```

3. Configure environment variables:

   Create a `.env` file in the root directory and provide the necessary variables, such as:

    ```env
    port=3000
    mongoURL=<your_mongodb_uri>
    secret=<your_jwt_secret>
    ```

4. Run the application:

    ```bash
    npm start
    ```

    The server will be running at `http://localhost:3000` or the specified port.

## Project Structure

Briefly explain the structure of your project. Highlight key directories and files.

## API Endpoints

Describe the available API endpoints, including their routes, methods, and required parameters.

### Example:

- **POST /api/user/register**
  - Registers a new user.
  - Requires a JSON payload with `name`, `username`, `email`, `password`, and `phonenumber`.
  - Returns a success message or error.

- **POST /api/user/login**
  - Logs in a user.
  - Requires a JSON payload with `email` and `password`.
  - Returns a JWT token on successful login.

- **POST /api/user/logout**
  - Logs out a user.
  - Requires a valid JWT token.
  - Invalidates the token.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing

## License

Specify the license under which your project is distributed.

## Acknowledgments

Acknowledge any libraries, tools, or contributors that you want to credit.

