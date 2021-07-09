const jwt = require('jsonwebtoken');
const { tokenValidation } = require('../utils/systemMessenge');

///////////////////////////////////// VERIFY TOKEN
const verifyToken = (req, res, next) => {
    // VERIFY TOKEN
    try {
        // CHECK HEADER
        const token = req.header('auth-token');
        if (!token) return res.status(401).json({ messenge: tokenValidation.requireToken });

        const verified = jwt.verify(token, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        req.role = verified.role;
        next();
    } catch (error) {
        res.status(400).json({ messenge: tokenValidation.invalidToken });
    }
};

///////////////////////////////////// VERIFY USER ROLE
const verifyRoles = (req, res, next) => {
    const verify = (req.role === 'admin');
    if (!verify) return res.status(401).json({ messenge: tokenValidation.requireAdmin });
    next();
};

const middleware = {
    verifyToken,
    verifyRoles,
};
module.exports = middleware;