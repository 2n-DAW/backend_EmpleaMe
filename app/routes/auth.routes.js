const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    const { userType, clientUserLogin, registerUser, getCurrentUser, updateUser, logout, userDelete } = require('../controllers/auth.controller.js');

    app.post('/user/type', userType);
    
    app.post('/user/login', clientUserLogin);

    app.post('/user', registerUser);

    app.get('/user', verifyJWT, getCurrentUser);

    app.put('/user', verifyJWT, updateUser);

    app.get('/user/logout', verifyJWT, logout);

    app.delete('/user/:username', userDelete); //Compensación para el fallo del patron saga en el register

}