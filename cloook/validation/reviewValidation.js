const Joi = require("joi");

const validateReview = (review) => {
    const Schema = Joi.object({
        user_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        product_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        rating: Joi.number().integer().min(1).max(5).required(),
        comment: Joi.string().allow(null, "")
    });
    return Schema.validate(review);
};

module.exports = { validateReview };
