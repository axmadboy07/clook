const { OrderItem, Order, Product } = require("../models");
const { validateOrderItem } = require("../validation/orderItemValidation");

exports.createOrderItem = async (req, res) => {
    const { error } = validateOrderItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const orderItem = await OrderItem.create(req.body);
        res.status(201).send(orderItem);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getOrderItems = async (req, res) => {
    try {
        const orderItems = await OrderItem.findAll({
            include: [
                { model: Order, as: "order" },
                { model: Product, as: "product" },
            ],
        });
        res.status(200).send(orderItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getOrderItemById = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id, {
            include: [
                { model: Order, as: "order" },
                { model: Product, as: "product" },
            ],
        });
        if (!orderItem) return res.status(404).send("Order item not found");
        res.status(200).send(orderItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateOrderItem = async (req, res) => {
    const { error } = validateOrderItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).send("Order item not found");

        await orderItem.update(req.body);
        res.status(200).send(orderItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteOrderItem = async (req, res) => {
    try {
        const orderItem = await OrderItem.findByPk(req.params.id);
        if (!orderItem) return res.status(404).send("Order item not found");

        const orderItemData = orderItem.toJSON();
        await orderItem.destroy();
        res.status(200).send(orderItemData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
