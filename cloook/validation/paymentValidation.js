const Joi = require("joi");

const validatePayment = (payment) => {
    const Schema = Joi.object({
        order_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        method: Joi.string().required(),
        status: Joi.string(),
        amount: Joi.number().required(),
        paid_at: Joi.date().allow(null)
    });
    return Schema.validate(payment);
};

module.exports = { validatePayment };
