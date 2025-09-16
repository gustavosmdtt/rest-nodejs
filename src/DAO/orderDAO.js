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
    }
};