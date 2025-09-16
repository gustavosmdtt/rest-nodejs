class OrderService {
    constructor(orderDAO) {
        this.orderDAO = orderDAO;
    }

    async getAllOrders(dbConnection) {
        const orders = await this.orderDAO.getAllOrders(dbConnection);

        if (orders.length === 0) {            
            const error = {
                status: 404,
                response: {
                    message: 'No orders have been registered yet'
                }
            };
            throw error;
        }

        const response = {
            orders: orders.map(order => ({
                orderId: order.orderId,
                quantity: order.quantity,
                product: {
                    productId: order.productId,
                    title: order.title,
                    price: order.price
                }
            }))
        };

        return response;
    }
}

module.exports = OrderService;