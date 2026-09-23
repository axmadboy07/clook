module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        "Payment",
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
            method: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "pending",
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            paid_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: "payments",
            timestamps: false,
        }
    );

    Payment.associate = (models) => {
        Payment.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    };

    return Payment;
};
