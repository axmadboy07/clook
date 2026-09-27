module.exports = (sequelize, DataTypes) => {
    const ContactInquiry = sequelize.define(
        "ContactInquiry",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            salon_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            interest: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            preferred_date: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: true,
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
