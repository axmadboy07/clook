const Joi = require("joi");

const validateOrder = (order) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        address_id: Joi.number().integer().required(),
        total_amount: Joi.number().required(),
        status: Joi.string(),
        currency: Joi.string()
    });
    return Schema.validate(order);
};

module.exports = { validateOrder };
