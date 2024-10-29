const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    const { userType, clientUserLogin, registerUser, getCurrentUser, updateUser, logout } = require('../controllers/auth.controller.js');

    app.post('/user/type', userType);
    
    app.post('/user/login', clientUserLogin);

    app.post('/user', registerUser);

    app.get('/user', verifyJWT, getCurrentUser);

    app.put('/user', verifyJWT, updateUser);

    app.get('/user/logout', verifyJWT, logout);

}