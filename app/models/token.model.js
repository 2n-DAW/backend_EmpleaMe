const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TokenSchema = mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    accessTokens: [{
        token: String,
        createdAt: Date
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});

TokenSchema.plugin(uniqueValidator, { msg: "already taken" });

module.exports = mongoose.model('Token', TokenSchema);