const Joi = require("joi");

const validateContactInquiry = (contactInquiry) => {
    const Schema = Joi.object({
        salon_id: Joi.number().integer().allow(null, "").optional(),
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(9).required(),
        interest: Joi.string().allow(null, "").optional(),
        location: Joi.string().allow(null, "").optional(),
        preferred_date: Joi.string().allow(null, "").optional(),
        preferredDate: Joi.string().allow(null, "").optional(),
        message: Joi.string().allow(null, "").optional()
    }).unknown(true);
    return Schema.validate(contactInquiry);
};

module.exports = { validateContactInquiry };

