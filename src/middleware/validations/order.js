const productDAO = require('../../DAO/productDAO');

const verifyProductExists = async (req, res, next) => {
    const productId = req.body.productId || req.params.productId;
    const result = await productDAO.getProductById(req.dbConnection, productId); 

    if (result.length === 0) {
        return res.status(404).send({
            message: 'Product not found for the provided ID'
        });
    };

    next()
};

module.exports = { 
    verifyProductExists
};