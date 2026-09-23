module.exports = (sequelize, DataTypes) => {
    const Faq = sequelize.define(
        "Faq",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            answer: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: "faqs",
            timestamps: false,
        }
    );

    return Faq;
};
