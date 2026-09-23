module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
        "BlogPost",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "blog_posts",
            timestamps: true,
            createdAt: "created_at",
            updatedAt: false,
        }
    );

    return BlogPost;
};
