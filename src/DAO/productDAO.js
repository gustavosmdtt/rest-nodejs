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

exports.getAllProducts = async (dbConnection) => {
    try {
        const [results] = await dbConnection.query(
            'SELECT * FROM products'
        );
        return results;
    } catch (error) {
        throw error
    };
};

exports.addProduct = async (dbConnection, productData) => {
    try {
        const [results] = await dbConnection.query(
            'INSERT INTO products (title, price) VALUES (?,?)',
            [productData.title, productData.price]
        );
        return results;
    } catch (error) {
        throw error;
    };
};

exports.updateProduct = async (dbConnection, productId, productData) => {
    try {
        const [results] = await dbConnection.query(
            `UPDATE products
                SET title = ?,
                    price = ?
              WHERE productId = ?`,
            [productData.title, productData.price, productId]
        );
        return results;
    } catch (error) {
        throw error;
    }
};

exports.deleteProduct = async (dbConnection, productId) => {
    try {
        const [results] = await dbConnection.query(
            'DELETE FROM products WHERE productId = ?',
            [productId]
        );
        return results;
    } catch (error) {
        throw error;
    }
};
