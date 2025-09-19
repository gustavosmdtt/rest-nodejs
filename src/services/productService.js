class ProductService {
    constructor(productDAO) {
        this.productDAO = productDAO;
    }

    async getAllProducts(dbConnection) {
        const products = await this.productDAO.getAllProducts(dbConnection);

        if (products.length === 0) {
            const error = {
                status: 404,
                response: {
                    message: 'No products have been registered yet'
                }
            };
            throw error;
        };

        const response = {
            quantity: products.length,
            products: products.map(product => ({
                productId: product.productId,
                title: product.title,
                price: product.price
            }))
        };

        return response;
    };

    async addProduct(dbConnection, productData) {
        const result = await this.productDAO.addProduct(dbConnection, productData);

        const response = {
            message: 'Product successfully inserted',
            product: {
                productId: result.insertId,
                title: productData.title,
                price: productData.price
            }
        };

        return response;
    };

    async getProductById(dbConnection, id) {
        const product = await this.productDAO.getProductById(dbConnection, id);

        if (product.length === 0) {
            const error = {
                status: 404,
                response: {
                    message: 'Product not found for the provided ID'
                }
            };
            throw error;
        };

        const response = {
            product: {
                productId: product[0].productId,
                title: product[0].title,
                price: product[0].price
            }
        };

        return response;
    };

    async updateProduct(dbConnection, id, productData) {
        const result = await this.productDAO.updateProduct(dbConnection, id, productData);

        if (result.affectedRows === 0) {
            const error = {
                status: 404,
                response: {
                    message: 'Product not found for the provided ID'
                }
            };
            throw error;
        }

        const response = {
            message: 'Product successfully updated',
            product: {
                productId: Number(id),
                title: productData.title,
                price: productData.price
            }
        };

        return response;
    };

    async deleteProduct(dbConnection, id) {
        const result = await this.productDAO.deleteProduct(dbConnection, id);

        if (result.affectedRows === 0) {
            const error = {
                status: 404,
                response: {
                    message: 'Product not found for the provided ID'
                }
            };
            throw error;
        }

        const response = {
            message: 'Product successfully deleted'
        };

        return response;
    };
}

module.exports = ProductService;