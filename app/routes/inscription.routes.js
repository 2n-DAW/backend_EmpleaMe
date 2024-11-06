const verifyJWT = require('../middleware/verifyJWT');

module.exports = (app) => {
    const { createInscription, getInscriptions, deleteInscription } = require('../controllers/inscriptions.controller');

    app.post('/inscription', createInscription);
    app.get('/inscription', verifyJWT, getInscriptions);
    app.delete('/inscription', verifyJWT, deleteInscription);
}
