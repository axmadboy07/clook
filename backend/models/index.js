const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user")(sequelize, Sequelize);
const Category = require("./category")(sequelize, Sequelize);
const Product = require("./product")(sequelize, Sequelize);
const Salon = require("./salon")(sequelize, Sequelize);
const ContactInquiry = require("./contactInquiry")(sequelize, Sequelize);
const BlogPost = require("./blogPost")(sequelize, Sequelize);
const Faq = require("./faq")(sequelize, Sequelize);
const CartItem = require("./cartItem")(sequelize, Sequelize);
const WishlistItem = require("./wishlistItem")(sequelize, Sequelize);
const Review = require("./review")(sequelize, Sequelize);
const Order = require("./order")(sequelize, Sequelize);
const OrderItem = require("./orderItem")(sequelize, Sequelize);
const Payment = require("./payment")(sequelize, Sequelize);
const Address = require("./address")(sequelize, Sequelize);

const models = {
    User,
    Category,
    Product,
    Salon,
    ContactInquiry,
    BlogPost,
    Faq,
    CartItem,
    WishlistItem,
    Review,
    Order,
    OrderItem,
    Payment,
    Address,
};

Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    User,
    Category,
    Product,
    Salon,
    ContactInquiry,
    BlogPost,
    Faq,
    CartItem,
    WishlistItem,
    Review,
    Order,
    OrderItem,
    Payment,
    Address,
    sequelize,
    Sequelize,
};
