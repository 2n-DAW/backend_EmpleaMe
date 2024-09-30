const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const contract_schema = mongoose.Schema({
    id_contract: {
        type: String,
        required: true,
        unique: true
    },
    contract_name: {
        type: String,
        required: true
    }
});

contract_schema.plugin(uniqueValidator, { msg: "already taken" });

contract_schema.methods.toContractResponse = function() {
    return {
        id_contract: this.id_contract,
        contract_name: this.contract_name
    };
};

contract_schema.methods.toContractJSON = function () {
    return {
        id_contract: this.id_contract,
        contract_name: this.contract_name
    }
};

module.exports = mongoose.model('Contract', contract_schema); //exportamos el modelo Contract