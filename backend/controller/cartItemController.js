const { CartItem, User, Product } = require("../models");
const { validateCartItem } = require("../validation/cartItemValidation");

exports.createCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const cartItem = await CartItem.create(req.body);
        res.status(201).send(cartItem);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            include: [
                { model: User, as: "user" },
                { model: Product, as: "product" },
            ],
        });
        res.status(200).send(cartItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id, {
            include: [
                { model: User, as: "user" },
                { model: Product, as: "product" },
            ],
        });
        if (!cartItem) return res.status(404).send("Cart item not found");
        res.status(200).send(cartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCartItem = async (req, res) => {
    const { error } = validateCartItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("Cart item not found");

        await cartItem.update(req.body);
        res.status(200).send(cartItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).send("Cart item not found");

        const cartItemData = cartItem.toJSON();
        await cartItem.destroy();
        res.status(200).send(cartItemData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
