const inscriptionRepo = require("../repositories/inscription.repo.js");
const { resp } = require("../utils/utils.js");

const createInscription = async (data) => {

    const { user_email, job } = data.body.inscription;

    const inscription_data = {
        user_email,
        job,
        status: 1,
        // date: new Date()
    };
    const res = await inscriptionRepo.createInscription(inscription_data);

    return resp(201, res.toInscriptionResponse());
};

const getInscriptions = async (req) => {
    const user_email = req.userEmail;
    const res = await inscriptionRepo.findUserInscriptions(user_email);

    return resp(200, res.map((inscription) => inscription.toInscriptionResponse()));
}

const deleteInscription = async (req) => {
    const user_email = req.userEmail;
    const { job } = req.body.inscription;
    const res = await inscriptionRepo.deleteInscription(user_email, job);

    return resp(200, res);
}

module.exports = {
    createInscription,
    getInscriptions,
    deleteInscription
}
