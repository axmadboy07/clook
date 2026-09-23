const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Clook API with Swagger",
            version: "1.0.0",
            description: "Clook E-commerce API documentation",
        },
        servers: [
            {
                url: "/api",
                description: "Local API server",
            },
        ],
    },
    apis: [
        path.resolve(__dirname, "../routes/userRoutes.js"),
        path.resolve(__dirname, "../routes/categoryRoutes.js"),
        path.resolve(__dirname, "../routes/productRoutes.js"),
        path.resolve(__dirname, "../routes/salonRoutes.js"),
        path.resolve(__dirname, "../routes/contactInquiryRoutes.js"),
        path.resolve(__dirname, "../routes/blogPostRoutes.js"),
        path.resolve(__dirname, "../routes/faqRoutes.js"),
        path.resolve(__dirname, "../routes/cartItemRoutes.js"),
        path.resolve(__dirname, "../routes/wishlistItemRoutes.js"),
        path.resolve(__dirname, "../routes/reviewRoutes.js"),
        path.resolve(__dirname, "../routes/orderRoutes.js"),
        path.resolve(__dirname, "../routes/orderItemRoutes.js"),
        path.resolve(__dirname, "../routes/paymentRoutes.js"),
        path.resolve(__dirname, "../routes/addressRoutes.js"),
        path.resolve(__dirname, "../routes/*.js"),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
