const Joi = require("joi");

const validateProduct = (product) => {
    const Schema = Joi.object({
        category_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        name: Joi.string().min(2).required(),
        brand: Joi.string().min(2).required(),
        price: Joi.number().required(),
        stock: Joi.number().integer(),
        rating: Joi.number(),
        specs: Joi.object().allow(null)
    });
    return Schema.validate(product);
};

module.exports = { validateProduct };
