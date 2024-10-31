const mongoose = require('mongoose');


const InscriptionSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
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

InscriptionSchema.pre('validate', async function (next) {
    if (!this.slug) {
        await this.slugify();
    }
    next();
});


module.exports = mongoose.model('Inscription', JobSchema);