module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
        "BlogPost",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
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
