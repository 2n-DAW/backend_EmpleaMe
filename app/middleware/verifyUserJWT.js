const jwt = require('jsonwebtoken');

const verifyJWTOptional = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization


    if (!authHeader || !authHeader?.startsWith('Token ') || !authHeader.split(' ')[1].length) {
        req.loggedin = false;
        req.same_User = false;
        return next();
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                req.same_User = false
                return res.status(403).json({ message: 'Forbidden' });
            }
            if (req.params.username === decoded.user.username) {
                req.same_User = true;
            } else {
                req.same_User = false;
            }
            req.loggedin = true;
            req.userId = decoded.user.id;
            req.userEmail = decoded.user.email;
            req.userHashedPwd = decoded.user.password;
            next();
        }
    )
};

module.exports = verifyJWTOptional;
