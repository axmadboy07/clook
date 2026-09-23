module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define(
        "Address",
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
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "addresses",
            timestamps: false,
        }
    );

    Address.associate = (models) => {
        Address.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
        Address.hasMany(models.Order, { foreignKey: "address_id", as: "orders" });
    };

    return Address;
};
