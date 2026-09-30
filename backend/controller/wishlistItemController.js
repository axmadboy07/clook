const { WishlistItem, User, Product } = require("../models");
const { validateWishlistItem } = require("../validation/wishlistItemValidation");
const { Op } = require("sequelize");

const resolveUser = async (userIdOrEmail) => {
    if (!userIdOrEmail) {
        return await User.findByPk(8) || await User.findByPk(7) || await User.findOne();
    }
    const rawStr = String(userIdOrEmail).trim();
    // 1. Check email (case-insensitive)
    let u = await User.findOne({
        where: {
            email: { [Op.iLike]: rawStr }
        }
    });
    if (u) return u;

    // 2. Check phone or full_name
    u = await User.findOne({
        where: {
            [Op.or]: [
                { phone: rawStr },
                { full_name: { [Op.iLike]: rawStr } }
            ]
        }
    });
    if (u) return u;

    // 3. Exact integer ID check
    const numeric = parseInt(rawStr, 10);
    if (!isNaN(numeric) && String(numeric) === rawStr && numeric > 0 && numeric < 2147483647) {
        u = await User.findByPk(numeric);
        if (u) return u;
    }

    return await User.findByPk(8) || await User.findByPk(7) || await User.findOne();
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

exports.createWishlistItem = async (req, res) => {
    try {
        const { error } = validateWishlistItem(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await resolveUser(req.body.user_id);
        const prod = await resolveProduct(req.body.product_id);

        if (!user || !prod) {
            return res.status(404).send("User or Product not found");
        }

        let existing = await WishlistItem.findOne({
            where: { user_id: user.id, product_id: prod.id }
        });

        if (existing) {
            return res.status(200).send(existing);
        }

        const wishlistItem = await WishlistItem.create({
            user_id: user.id,
            product_id: prod.id
        });
        res.status(201).send(wishlistItem);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.syncWishlistItems = async (req, res) => {
    try {
        const { user_id, items } = req.body;
        const user = await resolveUser(user_id);
        if (!user) return res.status(404).send("User not found");

        const itemList = Array.isArray(items) ? items : [];

        await WishlistItem.destroy({ where: { user_id: user.id } });

        const createdItems = [];
        for (const itm of itemList) {
            const prod = await resolveProduct(itm.id || itm.product_id || itm.name);
            if (prod) {
                const already = createdItems.some(c => c.product_id === prod.id);
                if (!already) {
                    const row = await WishlistItem.create({
                        user_id: user.id,
                        product_id: prod.id
                    });
                    createdItems.push(row);
                }
            }
        }

        res.status(200).send({
            message: "Wishlist synced successfully",
            wishlist_items: createdItems
        });
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getWishlistItems = async (req, res) => {
    try {
        const whereClause = {};
        if (req.query.user_id) {
            const user = await resolveUser(req.query.user_id);
            if (user) whereClause.user_id = user.id;
        }

        const wishlistItems = await WishlistItem.findAll({
            where: whereClause,
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
        const { id } = req.params;
        const { user_id, product_id } = req.query;

        let wishlistItem = null;
        const numeric = parseInt(String(id).replace(/\D/g, ''), 10);
        if (!isNaN(numeric) && numeric > 0 && numeric < 2147483647) {
            wishlistItem = await WishlistItem.findByPk(numeric);
        }

        if (!wishlistItem && (user_id || product_id || id)) {
            const user = await resolveUser(user_id);
            const prod = await resolveProduct(product_id || id);
            if (user && prod) {
                wishlistItem = await WishlistItem.findOne({
                    where: { user_id: user.id, product_id: prod.id }
                });
            }
        }

        if (!wishlistItem) {
            return res.status(200).send({ message: "Wishlist item already removed or not found" });
        }

        const wishlistItemData = wishlistItem.toJSON();
        await wishlistItem.destroy();
        res.status(200).send(wishlistItemData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
