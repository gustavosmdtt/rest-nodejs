const pool = require('../mysql');

const handleDatabaseConnection = async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        req.dbConnection = connection;

        res.on('finish', () => {
            if (connection) connection.release();
        });

        next();
    } catch (error) {
        return res.status(500).json({ 
            message: 'Erro ao conectar ao banco de dados',
            error: error.message
        });
    }
};

module.exports = { handleDatabaseConnection };
