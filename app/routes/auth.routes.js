// const express = require('express');
// const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    const { userLogin, registerUser, getCurrentUser, updateUser } = require('../controllers/auth.controller.js');

    // Authentication
    app.post('/auth/login', userLogin);

    // Registration
    app.post('/auth', registerUser);

    // Get Current User
    app.get('/auth', verifyJWT, getCurrentUser);

    // Update User
    app.put('/auth', verifyJWT, updateUser);
}