const inscriptionRepo = require("../repositories/inscription.repo.js");
const { resp } = require("../utils/utils.js");

const createInscription = async (data) => {

    const { user_email, job } = data.body.inscription;

    const inscription_data = {
        user_email,
        job,
        status: 1,
        date: new Date()
    };
    const res = await inscriptionRepo.createInscription(inscription_data);

    return resp(201, res.toInscriptionResponse());
};

module.exports = {
    createInscription,
}
