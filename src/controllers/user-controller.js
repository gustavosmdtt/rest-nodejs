const mysql = require('../mysql').pool;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error })
        }

        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [req.body.email],
            (error, results) => {
                if (error) {
                    return res.status(500).send({ error: error })
                }

                if (req.body.password.length < 8) {
                    return res.status(400).send({ message: 'Password must be at least 8 characters long' })
                }

                if (results.length > 0) {
                    res.status(401).send({ message: 'User already registered' })
                } else {
                    let numSalt = 10
                    bcrypt.hash(req.body.password, numSalt, (errorBcrypt, hash) => {
                        if (errorBcrypt) {
                            return res.status(500).send({ error: errorBcrypt })
                        }
                        connection.query(
                            `INSERT INTO users (email, password) VALUES (?,?)`,
                            [req.body.email, hash],
                            (error, result) => {
                                connection.release();
                                if (error) {
                                    return res.status(500).send({ error: error })
                                }
                                response = {
                                    message: 'User successfully created',
                                    userCreated: {
                                        userId: result.insertId,
                                        email: req.body.email
                                    }
                                }
                                return res.status(201).send(response);
                            }
                        )
                    })

                }
            }
        )
    });
}

exports.login = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) {
            return res.status(500).send({ error: error });
        }
 
        connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [req.body.email],
            (error, results, fields) => {
                connection.release();

                if (error) {
                    return res.status(500).send({ error: error })
                }
                console.log(results);
                if (results.length === 0) {
                    return res.status(401).send({ message: 'Invalid credentials' });
                }

                bcrypt.compare(req.body.password, results[0].password, (error, result) => {                    
                    if (error) {
                        return res.status(500).send({ message: 'Internal server error' });
                    }

                    if (result) {
                        const token = jwt.sign({
                            userId: results[0].userId,
                            email: results[0].email
                        },
                        `${process.env.JWT_KEY}`,
                        {
                            expiresIn: '1h' 
                        });
                        return res.status(200).send({
                            message: 'Authentication successful',
                            token: token
                        });
                    }

                    return res.status(401).send({ message: 'Invalid credentials' });
                })
        })
    }) 
}