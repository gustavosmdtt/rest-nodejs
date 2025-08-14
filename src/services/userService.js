const bcrypt = require('bcryptjs');

const createUser = async (dbConnection, userData) => {
    const numSalt = 10;

    try {
        const hash = await bcrypt.hash(userData.password, numSalt);
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';

        const [results] = await dbConnection.query(query, [userData.email, hash]);

        return {
            userId: results.insertId,
            email: userData.email,
        };

    } catch (error) {
        throw error;
    }
};

module.exports = { createUser };
