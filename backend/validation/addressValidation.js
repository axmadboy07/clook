const Joi = require("joi");

const validateAddress = (address) => {
    const Schema = Joi.object({
        user_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        city: Joi.string().min(2).required(),
        street: Joi.string().min(3).required(),
        phone: Joi.string().min(5).required()
    });
    return Schema.validate(address);
};

module.exports = { validateAddress };
