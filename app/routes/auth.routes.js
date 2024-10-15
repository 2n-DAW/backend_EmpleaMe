const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    const { userLogin, registerUser, getCurrentUser, updateUser, logout } = require('../controllers/auth.controller.js');

    app.post('/users/login', userLogin);

    app.post('/users/register', registerUser);

    app.get('/user', verifyJWT, getCurrentUser);

    app.put('/user', verifyJWT, updateUser);

    app.get('/user/logout', verifyJWT, logout);

}