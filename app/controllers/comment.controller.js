const commentService = require("../services/comment.service.js");
const asyncHandler = require('express-async-handler');


const addCommentsToJob = asyncHandler(async (req, res) => {
    const { status, result } = await commentService.addCommentsToJob(req);
    return res.status(status).json(result);
});


const getCommentsFromJob = asyncHandler(async (req, res) => {
    const { status, result } = await commentService.getCommentsFromJob(req);
    return res.status(status).json(result);
});


const deleteComment = asyncHandler(async (req, res) => {
    const { status, result } = await commentService.deleteComment(req);
    return res.status(status).json(result);
});

const getUserComments = asyncHandler(async (req, res) => {
    const { status, result } = await commentService.getUserComments(req);
    return res.status(status).json(result);
});

const deleteCommentById = asyncHandler(async (req, res) => {
    const { status, result } = await commentService.deleteCommentById(req);
    return res.status(status).json(result);
});

const getCommentsByUsername = asyncHandler(async (req, res) => {
    const { status, result } = await commentService.getCommentsByUsername(req);
    return res.status(status).json(result);
});


module.exports = {
    addCommentsToJob,
    getCommentsFromJob,
    deleteComment,
    getUserComments,
    deleteCommentById,
    getCommentsByUsername
};