const commentModel = require("../models/comment.model.js");


const createComment = async (comment) => {
    return await commentModel.create(comment);
}

const toCommentResponse = async (comment, user) => {
    return comment.toCommentResponse(user);
}

module.exports = {
    createComment,
    toCommentResponse
}