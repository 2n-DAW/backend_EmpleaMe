const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    const { userType, clientUserLogin, registerUser, getCurrentUser, updateUser, logout } = require('../controllers/auth.controller.js');

    app.post('/users/userType', userType);
    
    app.post('/users/login', clientUserLogin);

    app.post('/users/register', registerUser);

    app.get('/user', verifyJWT, getCurrentUser);

    app.put('/user', verifyJWT, updateUser);

    app.get('/user/logout', verifyJWT, logout);

}