const handleTypeOrderFormat = (req, res, next) => {
    const order = req.params.orderId;

    if (order === undefined || order === null || isNaN(order) || Number(order) <= 0) {
        return res.status(400).send({
            message: 'Invalid order ID format'
        });
    }

    next();
}

module.exports = {
    handleTypeOrderFormat
}
