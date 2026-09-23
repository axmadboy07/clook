const Joi = require("joi");

const validateContactInquiry = (contactInquiry) => {
    const Schema = Joi.object({
        salon_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        message: Joi.string().min(5).required()
    });
    return Schema.validate(contactInquiry);
};

module.exports = { validateContactInquiry };
