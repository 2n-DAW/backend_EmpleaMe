// SERVICES: toda la lógica de negocio
const contractRepo = require("../repositories/contract.repo.js");

//CREATE
const createContract = async (data) => {
    //montamos el objeto con los datos que vienen en el body
    const contract_data = {
        id_contract: data.id_contract || null,
        contract_name: data.contract_name || null,
    };

    return await contractRepo.createContract(contract_data);
};

// FIND ALL
const findAllContracts = async () => {
    const contracts = await contractRepo.findAllContracts();

    if (!contracts) {
        return { message: "No se encontraron contratos" };
    }

    return await Promise.all(contracts.map(async contract => {
            return await contract.toContractResponse();
        }));
};

// DELETE ONE
const deleteOneContract = async (params) => {
    const contract = await contractRepo.deleteOneContract(params);

    if (!contract) {
        return { message: "Contrato no encontrada" };
    }

    return { message: "Contrato eliminada" };
};

module.exports = {
    createContract,
    findAllContracts,
    deleteOneContract
}