const handleFormatJsonError = (err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            message: 'Invalid JSON format',
            error: err.message
        });
    }

    next(err);
}

const handleQuantityTypeError = (req, res, next) => {
    const quantity = req.body.quantity;
    if (quantity === undefined || quantity === null || isNaN(quantity) || Number(quantity) <= 0) {
        return res.status(400).send({
            message: 'Invalid quantity. Please provide a numeric value greater than zero.'
        });
    }

    next();
}

module.exports = { 
    handleFormatJsonError,
    handleQuantityTypeError
};