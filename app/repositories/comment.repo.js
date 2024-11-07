const commentModel = require("../models/comment.model.js");


const createComment = async (comment) => {
    return await commentModel.create(comment);
}

const toCommentResponse = async (comment, user) => {
    return comment.toCommentResponse(user);
}

const findById = async (id) => {
    return await commentModel.findById(id);
}

const deleteOne = async (id) => {
    return await commentModel.deleteOne({ _id: id });
}

const findUserComments = async (userId) => {
    console.log(userId);
    return await commentModel.find({ author: userId });
}

module.exports = {
    createComment,
    toCommentResponse,
    findById,
    deleteOne,
    findUserComments
}