const { addCommentsToJob, getCommentsFromJob, deleteComment, getUserComments } = require('../controllers/comment.controller');
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTOptional = require('../middleware/verifyJWTOptional');


module.exports = (app) => {

    app.post('/:slug/comments', verifyJWT, addCommentsToJob);

    app.get('/:slug/comments', verifyJWTOptional, getCommentsFromJob);

    app.delete('/:slug/comments/:id', verifyJWT, deleteComment)
    
    app.get('/comments', verifyJWT, getUserComments);
}
