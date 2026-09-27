module.exports = (sequelize, DataTypes) => {
    const WishlistItem = sequelize.define(
        "WishlistItem",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "wishlist_items",
            timestamps: false,
        }
    );

    WishlistItem.associate = (models) => {
        WishlistItem.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        WishlistItem.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    };

    return WishlistItem;
};
