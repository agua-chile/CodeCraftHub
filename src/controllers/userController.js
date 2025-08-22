/**
 * User Controller
 * ---------------
 * Handles user registration and login logic.
 * - registerUser: Registers a new user with hashed password.
 * - loginUser: Authenticates user and returns a JWT token.
 */

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Register a new user
 * -------------------
 * Expects: { username, email, password } in req.body
 * Response: 201 with success message, or 500 with error
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        // Handle errors (e.g., duplicate email, DB issues)
        res.status(500).json({ error: 'Registration failed.' });
    }
};

/**
 * Login user
 * ----------
 * Expects: { email, password } in req.body
 * Response: 200 with JWT token, or error message
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ error: 'User not found.' });

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: 'Invalid credentials.' });

        // Sign a JWT token with user ID
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'secret',  // Use secret from env or fallback
            { expiresIn: '1h' }
        );

        // Respond with token
        res.status(200).json({ token });
    } catch (error) {
        // Handle errors (e.g., DB issues)
        res.status(500).json({ error: 'Login failed.' });
    }
};