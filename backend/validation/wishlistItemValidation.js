const Joi = require("joi");

const validateWishlistItem = (wishlistItem) => {
    const Schema = Joi.object({
        user_id: Joi.alternatives().try(Joi.number().integer(), Joi.string()).required(),
        product_id: Joi.alternatives().try(Joi.number().integer(), Joi.string()).required()
    });
    return Schema.validate(wishlistItem);
};

module.exports = { validateWishlistItem };
