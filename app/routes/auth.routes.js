// const express = require('express');
// const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    const { userLogin, registerUser, getCurrentUser, updateUser } = require('../controllers/auth.controller.js');

    // Authentication
    app.post('/users/login', userLogin);

    // Registration
    app.post('/users', registerUser);

    // Get Current User
    app.get('/user', verifyJWT, getCurrentUser);

    // Update User
    app.put('/user', verifyJWT, updateUser);
}