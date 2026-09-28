const { Order, User, Address, OrderItem, Payment } = require("../models");
const { validateOrder } = require("../validation/orderValidation");

exports.createOrder = async (req, res) => {
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let userId = req.body.user_id;
        if (!userId) {
            let u = await User.findOne();
            if (!u) {
                u = await User.create({
                    full_name: req.body.customerName || "CHRONOS Guest Collector",
                    email: req.body.customerEmail || `guest_${Date.now()}@chronos.uz`,
                    phone: req.body.customerPhone || "+998900000000",
                    password_hash: "guest_password_secure",
                    role: "customer"
                });
            }
            userId = u.id;
        }

        let addressId = req.body.address_id;
        if (!addressId) {
            let a = await Address.findOne();
            if (!a) {
                a = await Address.create({
                    user_id: userId,
                    street: req.body.shippingAddress || req.body.address || req.body.street || "Amir Temur shoh ko‘chasi, 107-B",
                    city: req.body.shippingCity || req.body.city || "Toshkent",
                    phone: req.body.customerPhone || req.body.phone || "+998901234567"
                });
            }
            addressId = a.id;
        }

        const totalAmount = Number(req.body.total_amount || req.body.totalUSD || req.body.totalAmountUSD || 0);

        const order = await Order.create({
            user_id: userId,
            address_id: addressId,
            total_amount: totalAmount,
            status: req.body.status || req.body.orderStatus || "pending",
            currency: req.body.currency || "USD"
        });
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

const resolveOrder = async (idParam) => {
    if (!idParam) return null;
    const numeric = parseInt(String(idParam).replace(/\D/g, ''), 10);
    if (!isNaN(numeric) && numeric > 0) {
        const byPk = await Order.findByPk(numeric, {
            include: [
                { model: User, as: "user" },
                { model: Address, as: "address" },
                { model: OrderItem, as: "order_items" },
                { model: Payment, as: "payment" },
            ]
        });
        if (byPk) return byPk;
    }
    return await Order.findOne({
        include: [
            { model: User, as: "user" },
            { model: Address, as: "address" },
            { model: OrderItem, as: "order_items" },
            { model: Payment, as: "payment" },
        ]
    });
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await resolveOrder(req.params.id);
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
        const order = await resolveOrder(req.params.id);
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
