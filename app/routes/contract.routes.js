module.exports = (app) => {
    const { createContract, findAllContracts, deleteOneContract } = require('../controllers/contract.controller.js');

    app.post('/contracts', createContract);

    app.get('/contracts', findAllContracts);

    app.delete('/contracts/:_id', deleteOneContract);
}