const findUserByEmail = async (req, res, next) => {
    try {
        const [results] = await req.dbConnection.query(
            `SELECT * FROM users WHERE email = ?`,
            [req.body.email]
        );

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Email not found'
            });
        }

        req.foundUser = results[0];
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Error querying the database',
            error: error.message
        });
    }
};

module.exports = { findUserByEmail };
