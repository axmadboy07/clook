const { User, CartItem, WishlistItem, Review, Order, Address } = require("../models");
const { validateUser } = require("../validation/userValidation");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
    try {
        const { email, emailOrPhone, password } = req.body;
        const identifier = (emailOrPhone || email || "").trim().toLowerCase();
        if (!identifier || !password) {
            return res.status(400).send("Email/telefon va parol kiritilishi shart");
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: identifier },
                    { phone: identifier }
                ]
            }
        });

        if (!user) {
            return res.status(401).send("Foydalanuvchi topilmadi yoki parol noto'g'ri");
        }

        const isValid = await bcrypt.compare(password, user.password_hash).catch(() => false);
        if (!isValid && user.password_hash !== password) {
            return res.status(401).send("Noto'g'ri parol");
        }

        const userData = user.toJSON();
        delete userData.password_hash;
        res.status(200).send({ user: userData, token: `chronos_auth_token_${user.id}` });
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.createUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await User.create(req.body);
        const userData = user.toJSON();
        delete userData.password_hash;
        res.status(201).send(userData);
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

const resolveUser = async (idParam, emailParam) => {
    if (!idParam && !emailParam) return null;
    let user = null;
    const numeric = parseInt(String(idParam).replace(/\D/g, ''), 10);
    if (!isNaN(numeric) && numeric > 0 && numeric < 2147483647) {
        user = await User.findByPk(numeric, {
            include: [
                { model: CartItem, as: "cart_items" },
                { model: WishlistItem, as: "wishlist_items" },
                { model: Review, as: "reviews" },
                { model: Order, as: "orders" },
                { model: Address, as: "addresses" },
            ]
        });
        if (user) return user;
    }
    const searchTarget = emailParam || idParam;
    return await User.findOne({
        where: {
            [Op.or]: [
                { email: searchTarget },
                { phone: searchTarget },
                { full_name: searchTarget }
            ]
        },
        include: [
            { model: CartItem, as: "cart_items" },
            { model: WishlistItem, as: "wishlist_items" },
            { model: Review, as: "reviews" },
            { model: Order, as: "orders" },
            { model: Address, as: "addresses" },
        ]
    });
};

exports.getUserById = async (req, res) => {
    try {
        const user = await resolveUser(req.params.id, req.query.email);
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
        const user = await resolveUser(req.params.id, req.body.email || req.query.email);
        if (!user) return res.status(404).send("User not found");

        await user.update(req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const idOrEmail = req.params.id || req.query.email || req.body?.email;
        const user = await resolveUser(idOrEmail, req.query.email || req.body?.email);
        if (!user) {
            // If user already deleted or not in database, return success confirmation
            return res.status(200).send({ message: "User deleted or not found in database", id: idOrEmail });
        }

        const userData = user.toJSON();
        delete userData.password_hash;
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
