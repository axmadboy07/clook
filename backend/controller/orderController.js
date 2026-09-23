const { Order, User, Address, OrderItem, Payment } = require("../models");
const { validateOrder } = require("../validation/orderValidation");

exports.createOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const order = await Order.create(req.body);
        res.status(201).send(order);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, as: "user" },
                { model: Address, as: "address" },
                { model: OrderItem, as: "order_items" },
                { model: Payment, as: "payment" },
            ],
        });
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { model: User, as: "user" },
                { model: Address, as: "address" },
                { model: OrderItem, as: "order_items" },
                { model: Payment, as: "payment" },
            ],
        });
        if (!order) return res.status(404).send("Order not found");
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).send("Order not found");

        await order.update(req.body);
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).send("Order not found");

        const orderData = order.toJSON();
        await order.destroy();
        res.status(200).send(orderData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
