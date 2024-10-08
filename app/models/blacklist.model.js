const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const BlacklistSchema = mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

BlacklistSchema.plugin(uniqueValidator, { msg: "already taken" });

module.exports = mongoose.model('Blacklist', BlacklistSchema);
