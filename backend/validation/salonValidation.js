const Joi = require("joi");

const validateSalon = (salon) => {
    const Schema = Joi.object({
        city: Joi.string().min(2).required(),
        address: Joi.string().min(3).required(),
        phone: Joi.string().min(5).required()
    });
    return Schema.validate(salon);
};

module.exports = { validateSalon };
