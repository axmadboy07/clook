const { Faq } = require("../models");
const { validateFaq } = require("../validation/faqValidation");
const { Op } = require("sequelize");

exports.createFaq = async (req, res) => {
    const { error } = validateFaq(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const faq = await Faq.create(req.body);
        res.status(201).send(faq);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getFaqs = async (req, res) => {
    try {
        const faqs = await Faq.findAll({});
        res.status(200).send(faqs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getFaqById = async (req, res) => {
    try {
        const faq = await Faq.findByPk(req.params.id);
        if (!faq) return res.status(404).send("FAQ not found");
        res.status(200).send(faq);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateFaq = async (req, res) => {
    const { error } = validateFaq(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const faq = await Faq.findByPk(req.params.id);
        if (!faq) return res.status(404).send("FAQ not found");

        await faq.update(req.body);
        res.status(200).send(faq);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        const faq = await Faq.findByPk(req.params.id);
        if (!faq) return res.status(404).send("FAQ not found");

        const faqData = faq.toJSON();
        await faq.destroy();
        res.status(200).send(faqData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchFaqs = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Query parameter is required");
        }
        const faqs = await Faq.findAll({
            where: {
                [Op.or]: [
                    { question: { [Op.iLike]: `%${query}%` } },
                    { answer: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });
        res.status(200).send(faqs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
