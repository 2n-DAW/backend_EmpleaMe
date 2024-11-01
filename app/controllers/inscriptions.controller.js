const expressAsyncHandler = require("express-async-handler");
const inscriptionService = require("../services/inscription.service");

const createInscription = expressAsyncHandler(async (req, res) => {
    const { status, result } = await inscriptionService.createInscription(req);
    return res.status(status).json(result);
});

module.exports = {
    createInscription,
}
