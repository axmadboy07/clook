const { Salon, ContactInquiry } = require("../models");
const { validateSalon } = require("../validation/salonValidation");
const { Op } = require("sequelize");

exports.createSalon = async (req, res) => {
    const { error } = validateSalon(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const salon = await Salon.create(req.body);
        res.status(201).send(salon);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getSalons = async (req, res) => {
    try {
        const salons = await Salon.findAll({
            include: [{ model: ContactInquiry, as: "contact_inquiries" }],
        });
        res.status(200).send(salons);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSalonById = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id, {
            include: [{ model: ContactInquiry, as: "contact_inquiries" }],
        });
        if (!salon) return res.status(404).send("Salon not found");
        res.status(200).send(salon);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSalon = async (req, res) => {
    const { error } = validateSalon(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) return res.status(404).send("Salon not found");

        await salon.update(req.body);
        res.status(200).send(salon);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteSalon = async (req, res) => {
    try {
        const salon = await Salon.findByPk(req.params.id);
        if (!salon) return res.status(404).send("Salon not found");

        const salonData = salon.toJSON();
        await salon.destroy();
        res.status(200).send(salonData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchSalons = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Query parameter is required");
        }
        const salons = await Salon.findAll({
            where: {
                [Op.or]: [
                    { city: { [Op.iLike]: `%${query}%` } },
                    { address: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });
        res.status(200).send(salons);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
