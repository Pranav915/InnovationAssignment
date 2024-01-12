# Innovation Assignment API Documentation

Welcome to the documentation for the Innovation Assignment API. This guide will help you understand the available endpoints, their purposes, and the expected request and response formats.

## Table of Contents
1. [Introduction](#introduction)
2. [Requests](#requests)
   - [Register](#register)
   - [Create Admin](#create-admin)
   - [Login](#login)
   - [Delete User](#delete-user)
   - [Update Profile Image](#update-profile-image)
   - [Update User Details](#update-user-details)

## Introduction
This API is designed to provide functionality for user management, authentication, and profile manipulation. It includes features such as user registration, login, profile updates, admin creation, and more.

## Installation

Follow these steps to get the project up and running.

### Prerequisites

- Node.js, libraries.
- Mongo DB

### Step 1: Clone the repository

```bash
git clone https://github.com/Pranav915/InnovationAssignment.git 
```

### Step 2: Setup the env variables in .env file in server folder

Create .env file and populate with the envrionment variables.
```bash
   # Innovation Assignment Configuration (Example .env file)

   # Port for the API server
   API_PORT=5000
   
   # MongoDB URI for database connection
   MONGO_URI=your_mongo_uri
   
   # Localhost URL for the client application
   LOCALHOST=http://localhost:3000/
   
   # Authentication Token for secure communication
   AUTH_TOKEN=
```

### Step 3: Start the backend

```bash
npm install
npm start
```

You must see the server live on localhost:5000.

## Requests

### Register
- **Endpoint:** `POST /register`
- **Purpose:** Register a new user.
- **Request Body:**
  - `type`: formdata
  - `form`:
    - `name`: User's name
    - `email`: User's email
    - `phoneNumber`: User's phone number
    - `password`: User's password
  - `files`:
    - `name`: image
    - `value`: Path to the image file
- **Headers:**
  - `Content-Type`: multipart/form-data
- **Response:**
  - 201 Created: User registered successfully
  - 400 Bad Request: Invalid request format or missing required fields
  - 409 Conflict: User with the same email or phone number already exists

### Create Admin
- **Endpoint:** `POST /createAdmin`
- **Purpose:** Create a new admin account.
- **Request Body:**
  - `type`: formdata
  - `form`:
    - `name`: Admin's name
    - `email`: Admin's email
    - `phoneNumber`: Admin's phone number
    - `password`: Admin's password
  - `files`:
    - `name`: image
    - `value`: Path to the image file
- **Headers:**
  - `Content-Type`: multipart/form-data
  - `Authorization`: Bearer token for authentication
- **Response:**
  - 201 Created: Admin account created successfully
  - 400 Bad Request: Invalid request format or missing required fields
  - 401 Unauthorized: Invalid or missing authentication token
  - 403 Forbidden: User lacks permission to create an admin account

### Login
- **Endpoint:** `POST /login`
- **Purpose:** Authenticate a user.
- **Request Body:**
  ```json
  {
    "identifier":"7066834146",
    "password": "12345"
  }
  ```
- **Response:**
  - 200 OK: Authentication successful, returns JWT token
  - 401 Unauthorized: Invalid credentials

### Delete User
- **Endpoint:** `POST /deleteUser/:userId`
- **Purpose:** Delete a user account.
- **Headers:**
  - `Authorization`: Bearer token for authentication
- **Response:**
  - 200 OK: User deleted successfully
  - 401 Unauthorized: Invalid or missing authentication token
  - 403 Forbidden: User lacks permission to delete the account
  - 404 Not Found: User with specified userId not found

### Update Profile Image
- **Endpoint:** `POST /updateProfileImage/:userId`
- **Purpose:** Update the profile image for a specific user.
- **Request Body:**
  - `type`: formdata
  - `files`:
    - `name`: image
    - `value`: Path to the image file
- **Headers:**
  - `Authorization`: Bearer token for authentication
- **Response:**
  - 200 OK: Image updated successfully
  - 401 Unauthorized: Invalid or missing authentication token
  - 403 Forbidden: User lacks permission to update the image
  - 404 Not Found: User with specified userId not found

### Update User Details
- **Endpoint:** `GET /update-user-details`
- **Purpose:** Update user information like name.
- **Request Body:**
  ```json
  {
    "name":"Pranav",
  }
  ```
- **Response:**
  - 200 OK: User details updated successfully
  - 401 Unauthorized: Invalid or missing authentication token
  - 403 Forbidden: User lacks permission to update the name
  - 404 Not Found: User with specified userId not found
