const Joi = require("joi");

const validateCategory = (category) => {
    const Schema = Joi.object({
        name: Joi.string().min(2).required(),
        slug: Joi.string().min(2).required()
    });
    return Schema.validate(category);
};

module.exports = { validateCategory };
