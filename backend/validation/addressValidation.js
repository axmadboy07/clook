const Joi = require("joi");

const validateAddress = (address) => {
    const Schema = Joi.object({
        user_id: Joi.alternatives().try(Joi.number().integer(), Joi.string()).required(),
        city: Joi.string().min(2).required(),
        street: Joi.string().min(3).optional(),
        address: Joi.string().min(3).optional(),
        phone: Joi.string().min(5).optional()
    });
    return Schema.validate(address);
};

module.exports = { validateAddress };
