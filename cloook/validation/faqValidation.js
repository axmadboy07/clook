const Joi = require("joi");

const validateFaq = (faq) => {
    const Schema = Joi.object({
        question: Joi.string().min(3).required(),
        answer: Joi.string().min(3).required()
    });
    return Schema.validate(faq);
};

module.exports = { validateFaq };
