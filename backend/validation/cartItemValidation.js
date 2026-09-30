const Joi = require("joi");

const validateCartItem = (cartItem) => {
    const Schema = Joi.object({
        user_id: Joi.alternatives().try(Joi.number().integer(), Joi.string()).required(),
        product_id: Joi.alternatives().try(Joi.number().integer(), Joi.string()).required(),
        quantity: Joi.number().integer().min(1).optional()
    });
    return Schema.validate(cartItem);
};

module.exports = { validateCartItem };
