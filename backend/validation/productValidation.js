const Joi = require("joi");

const validateProduct = (product) => {
    const Schema = Joi.object({
        category_id: Joi.number().integer().optional().allow(null),
        name: Joi.string().min(2).required(),
        brand: Joi.string().min(2).required(),
        price: Joi.number().required(),
        stock: Joi.number().integer().optional(),
        rating: Joi.number().optional(),
        specs: Joi.object().allow(null).optional()
    }).unknown(true);
    return Schema.validate(product);
};

module.exports = { validateProduct };

