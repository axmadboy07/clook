const Joi = require("joi");

const validateWishlistItem = (wishlistItem) => {
    const Schema = Joi.object({
        user_id: Joi.number().integer().required(),
        product_id: Joi.number().integer().required()
    });
    return Schema.validate(wishlistItem);
};

module.exports = { validateWishlistItem };
