const { ContactInquiry, Salon } = require("../models");
const { validateContactInquiry } = require("../validation/contactInquiryValidation");
const { Op } = require("sequelize");

exports.createContactInquiry = async (req, res) => {
    const { error } = validateContactInquiry(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const inquiry = await ContactInquiry.create(req.body);
        res.status(201).send(inquiry);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getContactInquiries = async (req, res) => {
    try {
        const inquiries = await ContactInquiry.findAll({
            include: [{ model: Salon, as: "salon" }],
        });
        res.status(200).send(inquiries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getContactInquiryById = async (req, res) => {
    try {
        const inquiry = await ContactInquiry.findByPk(req.params.id, {
            include: [{ model: Salon, as: "salon" }],
        });
        if (!inquiry) return res.status(404).send("Contact inquiry not found");
        res.status(200).send(inquiry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateContactInquiry = async (req, res) => {
    const { error } = validateContactInquiry(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const inquiry = await ContactInquiry.findByPk(req.params.id);
        if (!inquiry) return res.status(404).send("Contact inquiry not found");

        await inquiry.update(req.body);
        res.status(200).send(inquiry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteContactInquiry = async (req, res) => {
    try {
        const inquiry = await ContactInquiry.findByPk(req.params.id);
        if (!inquiry) return res.status(404).send("Contact inquiry not found");

        const inquiryData = inquiry.toJSON();
        await inquiry.destroy();
        res.status(200).send(inquiryData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchContactInquiries = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Query parameter is required");
        }
        const inquiries = await ContactInquiry.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                    { message: { [Op.iLike]: `%${query}%` } },
                ],
            },
            include: [{ model: Salon, as: "salon" }],
        });
        res.status(200).send(inquiries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
