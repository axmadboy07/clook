const Joi = require("joi");

const validateCartItem = (cartItem) => {
    const Schema = Joi.object({
        user_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        product_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        quantity: Joi.number().integer().min(1)
    });
    return Schema.validate(cartItem);
};

module.exports = { validateCartItem };
