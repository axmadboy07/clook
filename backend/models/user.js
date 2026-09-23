const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password_hash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "customer",
            },
        },
        {
            tableName: "users",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    User.beforeSave(async (user) => {
        if (user.changed("password_hash")) {
            user.password_hash = await bcrypt.hash(user.password_hash, 10);
        }
    });

    User.associate = (models) => {
        User.hasMany(models.CartItem, { foreignKey: "user_id", as: "cart_items" });
        User.hasMany(models.WishlistItem, { foreignKey: "user_id", as: "wishlist_items" });
        User.hasMany(models.Review, { foreignKey: "user_id", as: "reviews" });
        User.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
        User.hasMany(models.Address, { foreignKey: "user_id", as: "addresses" });
    };

    return User;
};
