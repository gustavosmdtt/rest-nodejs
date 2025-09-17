exports.getProductById = async (dbConnection, id) => {
    try {
        const [results] = await dbConnection.query(
            'SELECT * FROM products WHERE productId = ?',
            [id]
        );
        return results;
    } catch (error) {
        throw error
    };
};