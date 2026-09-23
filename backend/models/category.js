module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            tableName: "categories",
            timestamps: false,
        }
    );

    Category.associate = (models) => {
        Category.hasMany(models.Product, { foreignKey: "category_id", as: "products" });
    };

    return Category;
};
