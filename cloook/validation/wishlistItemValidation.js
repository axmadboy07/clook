const Joi = require("joi");

const validateWishlistItem = (wishlistItem) => {
    const Schema = Joi.object({
        user_id: Joi.string().guid({ version: ["uuidv4"] }).required(),
        product_id: Joi.string().guid({ version: ["uuidv4"] }).required()
    });
    return Schema.validate(wishlistItem);
};

module.exports = { validateWishlistItem };
