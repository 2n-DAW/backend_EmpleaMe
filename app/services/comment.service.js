const commentRepo = require("../repositories/comment.repo.js");
const authRepo = require("../repositories/auth.repo.js");
const jobRepo = require("../repositories/job.repo.js");
const { resp } = require("../utils/utils.js");
const Comment = require("../models/comment.model.js");

const addCommentsToJob = async (req) => {
    const id = req.userId;
    const commenter = await authRepo.findById(id);
    if (!commenter) return resp(404, { message: "User not found" });

    const { slug } = req.params;
    const job = await jobRepo.findOneJob({ slug });
    if (!job) return resp(404, { message: "Job not found" });

    const body = req.body.comment;

    const obj_new_comment = {
        body,
        author: commenter._id,
        job: job._id
    };

    const new_comment = await commentRepo.createComment(obj_new_comment);

    await jobRepo.addComment(job, new_comment._id);

    return resp(201, { comment: await commentRepo.toCommentResponse(new_comment, commenter) });

};

const getCommentsFromJob = async (req) => {
    const { slug } = req.params;
    const job = await jobRepo.findOneJob({ slug });
    if (!job) return resp(404, { message: "Job not found" });
    const loggedin = req.loggedin;
    const comments = '';
    if (loggedin) {
        const loginUser = await authRepo.findById(req.userId);

        const comments = await Promise.all(job.comments.map(async commentId => {
            const commentObj = await Comment.findById(commentId);
            return await commentObj.toCommentResponse(loginUser);
        }))

        return resp(200, { comments });
    } else {
        comments = await Promise.all(job.comments.map(async (commentId) => {
            const commentObj = await Comment.findById(commentId).exec();
            const temp = await commentObj.toCommentResponse(false);
            return temp;
        }))

        return resp(200, { comments });
    }
}

const deleteComment = async (req) => {
    const userId = req.userId;
    const commenter = await authRepo.findById(userId);
    if (!commenter) return resp(404, { message: "User not found" });
    const { slug, id } = req.params;
    const job = await jobRepo.findOneJob({ slug });
    if (!job) return resp(404, { message: "Job not found" });
    console.log('---------------------------------', id);
    const comment = await commentRepo.findById(id);
    console.log(comment);
    if (comment.author.toString() === commenter._id.toString()) {
        await jobRepo.removeComment(job, comment._id);
        await commentRepo.deleteOne(comment._id);
        return resp(200, { message: "comment has been deleted" });

    } else {
        return resp(403, { error: "only the author of the comment can delete the comment" });
    }

}



module.exports = {
    addCommentsToJob,
    getCommentsFromJob,
    deleteComment

}