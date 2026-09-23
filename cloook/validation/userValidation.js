const Joi = require("joi");

const validateUser = (user) => {
    const Schema = Joi.object({
        full_name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password_hash: Joi.string().min(6).required(),
        phone: Joi.string().allow(null, ""),
        role: Joi.string()
    });
    return Schema.validate(user);
};

module.exports = { validateUser };
