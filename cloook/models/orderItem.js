module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
        "OrderItem",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            order_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            unit_price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            tableName: "order_items",
            timestamps: false,
        }
    );

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
        OrderItem.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    };

    return OrderItem;
};
