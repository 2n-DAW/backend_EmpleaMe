const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    const { userLogin, registerUser, getCurrentUser, updateUser, logout, favoriteJob, unfavoriteJob } = require('../controllers/auth.controller.js');

    // Authentication
    app.post('/users/login', userLogin);

    // Registration
    app.post('/users/register', registerUser);

    // Get Current User
    app.get('/user', verifyJWT, getCurrentUser);

    // Update User
    app.put('/user', verifyJWT, updateUser);

    // Logout
    app.get('/user/logout', logout);

}