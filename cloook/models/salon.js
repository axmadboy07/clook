module.exports = (sequelize, DataTypes) => {
    const Salon = sequelize.define(
        "Salon",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "salons",
            timestamps: false,
        }
    );

    Salon.associate = (models) => {
        Salon.hasMany(models.ContactInquiry, { foreignKey: "salon_id", as: "contact_inquiries" });
    };

    return Salon;
};
