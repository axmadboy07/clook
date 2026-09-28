const Joi = require("joi");

const validateOrder = (order) => {
    const Schema = Joi.object({
        user_id: Joi.any().optional(),
        address_id: Joi.any().optional(),
        total_amount: Joi.number().optional(),
        totalUSD: Joi.number().optional(),
        status: Joi.string().optional(),
        currency: Joi.string().optional()
    }).unknown(true);
    return Schema.validate(order);
};

module.exports = { validateOrder };

