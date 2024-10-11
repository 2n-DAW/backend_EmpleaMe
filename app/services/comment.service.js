const commentRepo = require("../repositories/comment.repo.js");
const authRepo = require("../repositories/auth.repo.js");
const jobRepo = require("../repositories/job.repo.js");
const { resp } = require("../utils/utils.js");

const addCommentsToJob = async (req) => {
    const id = req.userId;
    console.log(id);
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


module.exports = {
    addCommentsToJob

}