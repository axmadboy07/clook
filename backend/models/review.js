module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
        "Review",
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
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 1, max: 5 },
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "reviews",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    Review.associate = (models) => {
        Review.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        Review.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    };

    return Review;
};
