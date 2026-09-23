const { Address, User, Order } = require("../models");
const { validateAddress } = require("../validation/addressValidation");

exports.createAddress = async (req, res) => {
    const { error } = validateAddress(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const address = await Address.create(req.body);
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
