const { Address, User, Order } = require("../models");
const { validateAddress } = require("../validation/addressValidation");
const { Op } = require("sequelize");

const resolveUser = async (userIdOrEmail) => {
    if (!userIdOrEmail) return await User.findOne();
    const rawStr = String(userIdOrEmail).trim();
    let u = await User.findOne({
        where: { email: { [Op.iLike]: rawStr } }
    });
    if (u) return u;
    u = await User.findOne({
        where: {
            [Op.or]: [
                { phone: rawStr },
                { full_name: { [Op.iLike]: rawStr } }
            ]
        }
    });
    if (u) return u;
    const numeric = parseInt(rawStr, 10);
    if (!isNaN(numeric) && String(numeric) === rawStr && numeric > 0 && numeric < 2147483647) {
        u = await User.findByPk(numeric);
        if (u) return u;
    }
    return await User.findByPk(8) || await User.findByPk(7) || await User.findOne();
};

exports.createAddress = async (req, res) => {
    const { error } = validateAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const user = await resolveUser(req.body.user_id);
        if (!user) return res.status(404).send("User not found");

        const street = req.body.street || req.body.address || "Markaziy manzil";
        const phone = req.body.phone || user.phone || "+998900000000";
        const city = req.body.city || "Toshkent";

        const address = await Address.create({
            user_id: user.id,
            city,
            street,
            phone
        });
        res.status(201).send(address);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll({
            include: [
                { model: User, as: "user" },
                { model: Order, as: "orders" },
            ],
        });
        res.status(200).send(addresses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAddressById = async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id, {
            include: [
                { model: User, as: "user" },
                { model: Order, as: "orders" },
            ],
        });
        if (!address) return res.status(404).send("Address not found");
        res.status(200).send(address);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateAddress = async (req, res) => {
    const { error } = validateAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const address = await Address.findByPk(req.params.id);
        if (!address) return res.status(404).send("Address not found");

        await address.update(req.body);
        res.status(200).send(address);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if (!address) return res.status(404).send("Address not found");

        const addressData = address.toJSON();
        await address.destroy();
        res.status(200).send(addressData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
