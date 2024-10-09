const jwt = require('jsonwebtoken');
const authRepo = require('../repositories/auth.repo.js');

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader?.startsWith('Token ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const accessToken  = authHeader.split(' ')[1];
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decodedAccess) => {
        if (err) {
            // Si el accessToken ha expirado, busca el refreshToken asociado
            const refreshTokenFinded = await authRepo.findOneToken(accessToken);
            const refreshToken =refreshTokenFinded.refreshToken;

            if (!refreshToken) return res.status(403).json({ message: 'Tokens corruptos' });
            
            // Verificar que el refreshToken no esté en la blacklist
            const blacklisted = await authRepo.isBlacklisted(refreshToken);
            if (blacklisted) return res.status(403).json({ message: 'Refresh token en blacklist' });
            
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decodedRefresh) => {
                if (err) {
                // Si el refreshToken ha expirado, lo añade a la blacklist
                await authRepo.createBlacklistToken(refreshToken);
                // lo elimina de la lista de refresh activos
                await authRepo.deleteOneRefresh(refreshToken);
                return res.status(403).json({ message: 'Refresh token no válido' });
                }
                
                // Genera un nuevo accessToken               
                const newAccessToken = jwt.sign({
                "user": {
                    "id": decodedRefresh.user.id,
                    "username": decodedRefresh.user.username,
                    "email": decodedRefresh.user.email,
                    "password": decodedRefresh.user.password
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
                );

                // Guarda el nuevo accessToken en BD junto su correspondiente refreshToken
                await authRepo.saveToken(refreshToken, newAccessToken, decodedRefresh.user.id);

                req.userEmail = decodedRefresh.user.email;
                req.token = newAccessToken;
                next();
            });
        } else {
            req.userId = decodedAccess.user.id;
            req.userEmail = decodedAccess.user.email;
            req.userHashedPwd = decodedAccess.user.password;
            req.token = accessToken;
            next();
        }
    });
    };

module.exports = verifyJWT;
