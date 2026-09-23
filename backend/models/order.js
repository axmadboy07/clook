module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            address_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            total_amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "pending",
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "USD",
            },
        },
        {
            tableName: "orders",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    Order.associate = (models) => {
        Order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        Order.belongsTo(models.Address, { foreignKey: "address_id", as: "address" });
        Order.hasMany(models.OrderItem, { foreignKey: "order_id", as: "order_items" });
        Order.hasOne(models.Payment, { foreignKey: "order_id", as: "payment" });
    };

    return Order;
};
