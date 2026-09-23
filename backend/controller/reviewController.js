const { Review, User, Product } = require("../models");
const { validateReview } = require("../validation/reviewValidation");

exports.createReview = async (req, res) => {
    const { error } = validateReview(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const review = await Review.create(req.body);
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
