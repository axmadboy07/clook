const { User, CartItem, WishlistItem, Review, Order, Address } = require("../models");
const { validateUser } = require("../validation/userValidation");
const { Op } = require("sequelize");

exports.createUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                { model: CartItem, as: "cart_items" },
                { model: WishlistItem, as: "wishlist_items" },
                { model: Review, as: "reviews" },
                { model: Order, as: "orders" },
                { model: Address, as: "addresses" },
            ],
        });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: CartItem, as: "cart_items" },
                { model: WishlistItem, as: "wishlist_items" },
                { model: Review, as: "reviews" },
                { model: Order, as: "orders" },
                { model: Address, as: "addresses" },
            ],
        });
        if (!user) return res.status(404).send("User not found");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send("User not found");

        await user.update(req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).send("User not found");

        const userData = user.toJSON();
        await user.destroy();
        res.status(200).send(userData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchUsers = async (req, res) => {
    try {
        console.log("Query received:", req.query.query);
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Query parameter is required");
        }
        const users = await User.findAll({
            where: {
                [Op.or]: [
                    { full_name: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                ],
            },
            include: [
                { model: CartItem, as: "cart_items" },
                { model: WishlistItem, as: "wishlist_items" },
                { model: Review, as: "reviews" },
                { model: Order, as: "orders" },
                { model: Address, as: "addresses" },
            ],
        });
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
