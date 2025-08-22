/**
 * CodeCraftHub - Main Application Entry Point
 * -------------------------------------------
 * This file initializes the Express server, connects to MongoDB,
 * sets up middleware, routes, error handling, and serves static files.
 *
 * Features:
 * - Loads environment variables from .env
 * - Connects to MongoDB
 * - Serves static files from the 'public' directory
 * - Handles user-related API routes under /api/users
 * - Centralized error handling
 * - Starts the server on the specified port
 *
 * To serve static HTML (e.g., registerUser.html), place it in the 'public' directory.
 * Access it via: http://localhost:5000/registerUser.html
 */

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const initServer = require('./config/server');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./utils/errorHandler');

const app = initServer(); // Initialize Express app (with any custom config)

// Connect to MongoDB
connectDB();

// Serve static files from the 'public' directory (for HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../public')));

// Mount user-related API routes at /api/users
app.use('/api/users', userRoutes);

// Centralized error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * Directory Structure Example:
 * 
 * project-root/
 * ├── public/
 * │   └── registerUser.html
 * └── src/
 *     ├── app.js
 *     ├── config/
 *     ├── controllers/
 *     ├── models/
 *     ├── routes/
 *     └── utils/
 *
 * Usage:
 * - Place your static HTML (like registerUser.html) in the 'public' folder.
 * - Start the server: node src/app.js
 * - Access your HTML at: http://localhost:5000/registerUser.html
 */