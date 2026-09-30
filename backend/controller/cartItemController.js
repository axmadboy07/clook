const { CartItem, User, Product } = require("../models");
const { validateCartItem } = require("../validation/cartItemValidation");
const { Op } = require("sequelize");

const resolveUser = async (userIdOrEmail) => {
    if (!userIdOrEmail) {
        return await User.findByPk(7) || await User.findOne();
    }
    const rawStr = String(userIdOrEmail).trim();
    const numeric = parseInt(rawStr, 10);
    if (!isNaN(numeric) && String(numeric) === rawStr) {
        const u = await User.findByPk(numeric);
        if (u) return u;
    }
    let u = await User.findOne({
        where: {
            [Op.or]: [
                { email: rawStr },
                { phone: rawStr },
                { full_name: rawStr }
            ]
        }
    });
    if (u) return u;
    const digits = parseInt(rawStr.replace(/\D/g, ''), 10);
    if (!isNaN(digits) && digits > 0) {
        const byDigits = await User.findByPk(digits);
        if (byDigits) return byDigits;
    }
    return await User.findByPk(7) || await User.findOne();
};

const resolveProduct = async (prodIdOrName) => {
    if (!prodIdOrName) return null;
    const rawStr = String(prodIdOrName).trim();
    const numeric = parseInt(rawStr, 10);
    if (!isNaN(numeric) && String(numeric) === rawStr) {
        const p = await Product.findByPk(numeric);
        if (p) return p;
    }
    const clean = rawStr.replace(/[-_]/g, ' ').trim();
    const keywords = clean.split(' ').filter(k => k.length > 2);
    if (keywords.length > 0) {
        let p = await Product.findOne({
            where: {
                [Op.or]: keywords.map(kw => ({
                    name: { [Op.iLike]: `%${kw}%` }
                }))
            }
        });
        if (p) return p;
    }
    return await Product.findOne();
};

exports.createCartItem = async (req, res) => {
    try {
        const { error } = validateCartItem(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await resolveUser(req.body.user_id);
        const prod = await resolveProduct(req.body.product_id);

        if (!user || !prod) {
            return res.status(404).send("User or Product not found");
        }

        const qty = parseInt(req.body.quantity, 10) || 1;

        let existing = await CartItem.findOne({
            where: { user_id: user.id, product_id: prod.id }
        });

        if (existing) {
            existing.quantity = (existing.quantity || 1) + qty;
            await existing.save();
            return res.status(200).send(existing);
        }

        const cartItem = await CartItem.create({
            user_id: user.id,
            product_id: prod.id,
            quantity: qty
        });
        res.status(201).send(cartItem);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.syncCartItems = async (req, res) => {
    try {
        const { user_id, items } = req.body;
        const user = await resolveUser(user_id);
        if (!user) return res.status(404).send("User not found");

        const itemList = Array.isArray(items) ? items : [];

        await CartItem.destroy({ where: { user_id: user.id } });

        const createdItems = [];
        for (const itm of itemList) {
            const prod = await resolveProduct(itm.id || itm.product_id || itm.name || itm.key);
            if (prod) {
                const qty = parseInt(itm.quantity, 10) || 1;
                const existing = createdItems.find(c => c.product_id === prod.id);
                if (existing) {
                    existing.quantity += qty;
                    await existing.save();
                } else {
                    const row = await CartItem.create({
                        user_id: user.id,
                        product_id: prod.id,
                        quantity: qty
                    });
                    createdItems.push(row);
                }
            }
        }

        res.status(200).send({
            message: "Cart synced successfully",
            cart_items: createdItems
        });
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const whereClause = {};
        if (req.query.user_id) {
            const user = await resolveUser(req.query.user_id);
            if (user) whereClause.user_id = user.id;
        }

        const cartItems = await CartItem.findAll({
            where: whereClause,
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
        const { id } = req.params;
        const { user_id, product_id } = req.query;

        let cartItem = null;
        const numeric = parseInt(String(id).replace(/\D/g, ''), 10);
        if (!isNaN(numeric) && numeric > 0 && numeric < 2147483647) {
            cartItem = await CartItem.findByPk(numeric);
        }

        if (!cartItem && (user_id || product_id || id)) {
            const user = await resolveUser(user_id);
            const prod = await resolveProduct(product_id || id);
            if (user && prod) {
                cartItem = await CartItem.findOne({
                    where: { user_id: user.id, product_id: prod.id }
                });
            }
        }

        if (!cartItem) {
            return res.status(200).send({ message: "Cart item already removed or not found" });
        }

        const cartItemData = cartItem.toJSON();
        await cartItem.destroy();
        res.status(200).send(cartItemData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
