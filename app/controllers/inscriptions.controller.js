const expressAsyncHandler = require("express-async-handler");
const inscriptionService = require("../services/inscription.service");

const createInscription = expressAsyncHandler(async (req, res) => {
    const { status, result } = await inscriptionService.createInscription(req);
    return res.status(status).json(result);
});

const getInscriptions = expressAsyncHandler(async (req, res) => {
    const { status, result } = await inscriptionService.getInscriptions(req);
    return res.status(status).json(result);
});

const deleteInscription = expressAsyncHandler(async (req, res) => {
    const { status, result } = await inscriptionService.deleteInscription(req);
    return res.status(status).json(result);
});

module.exports = {
    createInscription,
    getInscriptions,
    deleteInscription
}
