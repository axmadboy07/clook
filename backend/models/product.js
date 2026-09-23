module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            category_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            rating: {
                type: DataTypes.FLOAT,
                defaultValue: 0.0,
            },
            specs: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            tableName: "products",
            timestamps: false,
        }
    );

    Product.associate = (models) => {
        Product.belongsTo(models.Category, { foreignKey: "category_id", as: "category" });
        Product.hasMany(models.CartItem, { foreignKey: "product_id", as: "cart_items" });
        Product.hasMany(models.WishlistItem, { foreignKey: "product_id", as: "wishlist_items" });
        Product.hasMany(models.Review, { foreignKey: "product_id", as: "reviews" });
        Product.hasMany(models.OrderItem, { foreignKey: "product_id", as: "order_items" });
    };

    return Product;
};
