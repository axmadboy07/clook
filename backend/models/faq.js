module.exports = (sequelize, DataTypes) => {
    const Faq = sequelize.define(
        "Faq",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            question: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            answer: {
                type: DataTypes.STRING,
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
