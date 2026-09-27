const Joi = require("joi");

const validateCartItem = (cartItem) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        product_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1)
    });
    return Schema.validate(cartItem);
};

module.exports = { validateCartItem };
