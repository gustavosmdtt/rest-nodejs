const jwt = require('jsonwebtoken');
const { createUser } = require('../services/userService');

exports.register = async (req, res, next) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        };

        const result = await createUser(req.dbConnection, user);

        const response = {
            message: 'User successfully created',
            userCreated: {
                userId: result.userId,
                email: result.email
            }
        };

        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({
            message: 'Created user failed',
            error: error.message
        });
    }
};

exports.login = (req, res, next) => {
    try {
        const { foundUser } = req;

        const token = jwt.sign({
            userId: foundUser.userId,
            email: foundUser.email
        },
            `${process.env.JWT_KEY}`,
            {
                expiresIn: '1h'
            });

        return res.status(200).send({
            message: 'Authentication successful',
            token: token
        });

    } catch (error) {
        return res.status(401).send({
            message: 'Authentication failed',
            error: error.message
        })
    }
}