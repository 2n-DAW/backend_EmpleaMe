const mongoose = require('mongoose');
const Auth = require('./auth.model');

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }
},
    {
        timestamps: true
    });


commentSchema.methods.toCommentResponse = async function (user) {
    const authorObj = await Auth.findById(this.author);
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        author: authorObj.toProfileJSON(user)
    }
};

module.exports = mongoose.model('Comment', commentSchema);
