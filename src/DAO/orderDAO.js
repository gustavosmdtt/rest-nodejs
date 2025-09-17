exports.getAllOrders = async (dbConnection) => {
    try {
        const [results] = await dbConnection.query(
            `SELECT orders.orderId, 
                    orders.quantity, 
                    products.productId, 
                    products.title,
                    products.price
               FROM orders
         INNER JOIN products
                 ON products.productId = orders.productId;`
        );
        return results;
    } catch (error) {
        throw error;
    };
};

exports.addOrder = async (dbConnection, orderData) => {
    try {
        const [results] = await dbConnection.query(
            'INSERT INTO orders (productId, quantity) VALUES (?,?)',
            [orderData.productId, orderData.quantity]
        );
        return results;
    } catch (error) {
        throw error;
    };
};

exports.getOrderById = async (dbConnection, id) => {
    try {
        const [results] = await dbConnection.query(
            'SELECT * FROM orders WHERE orderId = ?',
            [id]
        );
        return results;
    } catch (error) {
        throw error
    };
};
