const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const workingDay_schema = mongoose.Schema({
    id_workingDay: {
        type: String,
        required: true,
        unique: true
    },
    workingDay_name: {
        type: String,
        required: true
    }
});

workingDay_schema.plugin(uniqueValidator, { msg: "already taken" });

workingDay_schema.methods.toWorkingDayResponse = function() {
    return {
        id: this._id,
        id_workingDay: this.id_workingDay,
        workingDay_name: this.workingDay_name
    };
};

workingDay_schema.methods.toWorkingDayJSON = function () {
    return {
        id_workingDay: this.id_workingDay,
        workingDay_name: this.workingDay_name
    }
};

module.exports = mongoose.model('WorkingDay', workingDay_schema); //exportamos el modelo WorkingDay