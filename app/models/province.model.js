const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const province_schema = mongoose.Schema({
    id_province: {
        type: String,
        required: true,
        unique: true
    },
    province_name: {
        type: String,
        required: true
    },
});

province_schema.plugin(uniqueValidator, { msg: "already taken" });

province_schema.methods.toProvinceResponse = function() {
    return {
        id: this._id,
        id_province: this.id_province,
        province_name: this.province_name
    };
};

province_schema.methods.toProvinceJSON = function () {
    return {
        id_province: this.id_province,
        province_name: this.province_name
    }
};

module.exports = mongoose.model('Province', province_schema); //exportamos el modelo Province