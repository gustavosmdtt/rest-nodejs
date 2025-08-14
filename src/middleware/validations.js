const bcrypt = require('bcryptjs');

const handleFormatJsonError = (err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            message: 'Invalid JSON format',
            error: err.message
        });
    }

    next(err);
}

const verifyLoginFields = (req, res, next) => {
    if (!req.body.email || typeof req.body.email !== 'string' || !req.body.email.trim()) {
        return res.status(400).json({ message: 'Valid email is required' });
    }

    if (!req.body.password || typeof req.body.password !== 'string' || !req.body.password.trim()) {
        return res.status(400).json({ message: 'Valid password is required' });
    }

    next();
};

const verifyPassword = (req, res, next) => {
    const { password } = req.body;
    const { foundUser } = req;

    bcrypt.compare(password, foundUser.password, (error, result) => {
        if (error) {
            return res.status(500).send({
                message: 'Error in validate password',
                error: error.message
            });
        }

        if (!result) {
            return res.status(401).send({
                message: 'Invalid credentials'
            });
        }

        next();
    });
}

const verifyLengthPassword = (req, res, next) => {
    if (req.body.password.length < 8) {
        return res.status(400).send({
            message: 'Password must be at least 8 characters long'
        });
    }

    next();
};

const verifyEmailAlreadyExists = async (req, res, next) => {
    try {
        const [results] = await req.dbConnection.query(
            `SELECT * FROM users WHERE email = ?`,
            [req.body.email]
        );

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error querying the database',
            error: error.message
        });
    }
};

module.exports = {
    handleFormatJsonError,
    verifyEmailAlreadyExists,
    verifyLoginFields,
    verifyPassword,
    verifyLengthPassword
};