const { jwtVerify } = require('jsonwebtoken');

const required = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'Access token required' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decoded = await jwtVerify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
};

const optional = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) return next();

        const token = authHeader.split(' ')[1];
        if (!token) return next();

        const decoded = await jwtVerify(token, process.env.JWT_KEY);
        req.user = decoded;
    } catch (_) {
        // Ignore error
    }

    next();
};

module.exports = {
    required,
    optional
};
