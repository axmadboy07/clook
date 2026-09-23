module.exports = (sequelize, DataTypes) => {
    const ContactInquiry = sequelize.define(
        "ContactInquiry",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            salon_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { isEmail: true },
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: "contact_inquiries",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    ContactInquiry.associate = (models) => {
        ContactInquiry.belongsTo(models.Salon, { foreignKey: "salon_id", as: "salon" });
    };

    return ContactInquiry;
};
