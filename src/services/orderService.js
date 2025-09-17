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
    };

    async addOrder(dbConnection, orderData) {
        const result = await this.orderDAO.addOrder(dbConnection, orderData);

        const response = {
            message: 'Order successfully inserted',
            order: {
                orderId: result.insertId,
                productId: orderData.productId,
                quantity: orderData.quantity
            }
        };

        return response;
    };

    async getOrderById(dbConnection, id) {
        const order = await this.orderDAO.getOrderById(dbConnection, id);

        if(order.length === 0) {
            const error = {
                status: 404,
                response: {
                    message: 'Order not found for the provided ID'
                }
            };
            throw error;
        };

        const response = {
            order: {
                orderId: order[0].orderId,
                quantity: order[0].quantity,
                productId: order[0].productId
            }
        };

        return response;
    };
};

module.exports = OrderService;