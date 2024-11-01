const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const InscriptionSchema = mongoose.Schema({
    job: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
},
    {
        timestamps: true
    });

InscriptionSchema.plugin(uniqueValidator, { msg: "already taken" });

InscriptionSchema.methods.toInscriptionResponse = function () {
    return {
        job: this.job,
        user_email: this.user_email,
        status: this.status,
        date: this.date
    };
};

module.exports = mongoose.model('Inscription', InscriptionSchema);