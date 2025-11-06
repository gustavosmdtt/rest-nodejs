const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const { verifyLoginFields, verifyPassword, verifyLengthPassword, verifyEmailAlreadyExists } = require('../middleware/validations/user');
const { handleDatabaseConnection } = require('../middleware/database');
const { findUserByEmail } = require('../middleware/findUser');

router.post(
    '/register',
    verifyLoginFields,
    verifyLengthPassword,
    handleDatabaseConnection,
    verifyEmailAlreadyExists,
    UserController.register);

router.post(
    '/login',
    verifyLoginFields,
    handleDatabaseConnection,
    findUserByEmail,
    verifyPassword,
    UserController.login
);

module.exports = router;