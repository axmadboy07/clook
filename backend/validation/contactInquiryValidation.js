const Joi = require("joi");

const validateContactInquiry = (contactInquiry) => {
    const Schema = Joi.object({
        salon_id: Joi.number().integer().allow(null, ""),
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().allow(null, ""),
        interest: Joi.string().allow(null, ""),
        location: Joi.string().allow(null, ""),
        preferred_date: Joi.string().allow(null, ""),
        preferredDate: Joi.string().allow(null, ""),
        message: Joi.string().allow(null, "")
    });
    return Schema.validate(contactInquiry);
};

module.exports = { validateContactInquiry };
