module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define(
        "CartItem",
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
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
        },
        {
            tableName: "cart_items",
            timestamps: false,
        }
    );

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        CartItem.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    };

    return CartItem;
};
