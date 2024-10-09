const contractRepo = require("../repositories/contract.repo.js");
const { resp } = require("../utils/utils.js");

const createContract = async (data) => {
    const contract_data = {
        id_contract: data.id_contract || null,
        contract_name: data.contract_name || null,
    };
    const res = await contractRepo.createContract(contract_data);
    return resp(201, res.toContractResponse());
};


const findAllContracts = async () => {
    const contracts = await contractRepo.findAllContracts();

    if (!contracts) return resp(404, { message: "No se encontraron contratos" });

    const res = await Promise.all(contracts.map(async contract => {
        return await contract.toContractResponse();
    }));
    return resp(200, { contracts: res });
};


const deleteOneContract = async (params) => {
    const contract = await contractRepo.deleteOneContract(params);

    if (!contract) return resp(404, { message: "Contrato no encontrado" });

    return resp(200, { message: "Contrato eliminado" });
};

module.exports = {
    createContract,
    findAllContracts,
    deleteOneContract
}