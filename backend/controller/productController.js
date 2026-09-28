const { Product, Category, Review, CartItem, WishlistItem, OrderItem } = require("../models");
const { validateProduct } = require("../validation/productValidation");
const { Op } = require("sequelize");

exports.createProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        if (!req.body.category_id) {
            let cat = await Category.findOne();
            if (!cat) {
                cat = await Category.create({ name: req.body.category || "Luxury Watches", slug: "luxury-watches" });
            }
            req.body.category_id = cat.id;
        }
        const product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Category, as: "category" },
                { model: Review, as: "reviews" },
                { model: CartItem, as: "cart_items" },
                { model: WishlistItem, as: "wishlist_items" },
                { model: OrderItem, as: "order_items" },
            ],
        });
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const resolveProduct = async (idParam) => {
    if (!idParam) return null;
    const numeric = parseInt(String(idParam).replace(/\D/g, ''), 10);
    if (!isNaN(numeric) && numeric > 0) {
        const byPk = await Product.findByPk(numeric, {
            include: [
                { model: Category, as: "category" },
                { model: Review, as: "reviews" },
                { model: CartItem, as: "cart_items" },
                { model: WishlistItem, as: "wishlist_items" },
                { model: OrderItem, as: "order_items" },
            ]
        });
        if (byPk) return byPk;
    }
    return await Product.findOne({
        where: {
            name: { [Op.iLike]: `%${idParam}%` }
        },
        include: [
            { model: Category, as: "category" },
            { model: Review, as: "reviews" },
            { model: CartItem, as: "cart_items" },
            { model: WishlistItem, as: "wishlist_items" },
            { model: OrderItem, as: "order_items" },
        ]
    });
};

exports.getProductById = async (req, res) => {
    try {
        const product = await resolveProduct(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const product = await resolveProduct(req.params.id);
        if (!product) return res.status(404).send("Product not found");

        await product.update(req.body);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await resolveProduct(req.params.id);
        if (!product) return res.status(404).send("Product not found");

        const productData = product.toJSON();
        await product.destroy();
        res.status(200).send(productData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Query parameter is required");
        }
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { brand: { [Op.iLike]: `%${query}%` } },
                ],
            },
            include: [
                { model: Category, as: "category" },
                { model: Review, as: "reviews" },
            ],
        });
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
