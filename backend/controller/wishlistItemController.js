const { WishlistItem, User, Product } = require("../models");
const { validateWishlistItem } = require("../validation/wishlistItemValidation");

exports.createWishlistItem = async (req, res) => {
    const { error } = validateWishlistItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const wishlistItem = await WishlistItem.create(req.body);
        res.status(201).send(wishlistItem);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getWishlistItems = async (req, res) => {
    try {
        const wishlistItems = await WishlistItem.findAll({
            include: [
                { model: User, as: "user" },
                { model: Product, as: "product" },
            ],
        });
        res.status(200).send(wishlistItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getWishlistItemById = async (req, res) => {
    try {
        const wishlistItem = await WishlistItem.findByPk(req.params.id, {
            include: [
                { model: User, as: "user" },
                { model: Product, as: "product" },
            ],
        });
        if (!wishlistItem) return res.status(404).send("Wishlist item not found");
        res.status(200).send(wishlistItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteWishlistItem = async (req, res) => {
    try {
        const wishlistItem = await WishlistItem.findByPk(req.params.id);
        if (!wishlistItem) return res.status(404).send("Wishlist item not found");

        const wishlistItemData = wishlistItem.toJSON();
        await wishlistItem.destroy();
        res.status(200).send(wishlistItemData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
