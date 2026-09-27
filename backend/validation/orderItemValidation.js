const Joi = require("joi");

const validateOrderItem = (orderItem) => {
    const Schema = Joi.object({
        order_id: Joi.number().integer().required(),
        product_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1),
        unit_price: Joi.number().required()
    });
    return Schema.validate(orderItem);
};

module.exports = { validateOrderItem };
