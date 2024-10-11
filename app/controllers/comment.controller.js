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


module.exports = {
    addCommentsToJob,
    getCommentsFromJob,
    deleteComment
};