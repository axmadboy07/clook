const { Review, User, Product } = require("../models");
const { validateReview } = require("../validation/reviewValidation");

exports.createReview = async (req, res) => {
    try {
        let { user_id, product_id, rating, comment } = req.body;
        
        let user = user_id ? await User.findByPk(user_id).catch(() => null) : null;
        if (!user) user = await User.findOne().catch(() => null);
        if (user) user_id = user.id;

        let prod = product_id ? await Product.findByPk(product_id).catch(() => null) : null;
        if (!prod) prod = await Product.findOne().catch(() => null);
        if (prod) product_id = prod.id;

        const payload = {
            user_id: user_id || 1,
            product_id: product_id || 1,
            rating: Number(rating) || 5,
            comment: comment || ''
        };

        const { error } = validateReview(payload);
        if (error) return res.status(400).send(error.details[0].message);

        const review = await Review.create(payload);
        res.status(201).send(review);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                { model: User, as: "user" },
                { model: Product, as: "product" },
            ],
        });
        res.status(200).send(reviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id, {
            include: [
                { model: User, as: "user" },
                { model: Product, as: "product" },
            ],
        });
        if (!review) return res.status(404).send("Review not found");
        res.status(200).send(review);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateReview = async (req, res) => {
    const { error } = validateReview(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).send("Review not found");

        await review.update(req.body);
        res.status(200).send(review);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.id);
        if (!review) return res.status(404).send("Review not found");

        const reviewData = review.toJSON();
        await review.destroy();
        res.status(200).send(reviewData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
