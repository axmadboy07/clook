const Joi = require("joi");

const validateOrder = (order) => {
    const Schema = Joi.object({
        user_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        address_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        total_amount: Joi.number().required(),
        status: Joi.string(),
        currency: Joi.string()
    });
    return Schema.validate(order);
};

module.exports = { validateOrder };
