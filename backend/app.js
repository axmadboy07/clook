process.on('warning', (warning) => {
process.env.NODE_NO_WARNINGS = '1';
  if (warning.name === 'DeprecationWarning') {
    // Ignore deprecation warnings such as url.parse
  } else {
    console.warn(warning);
  }
});

const express = require("express");
const dotenv = require("dotenv");
const { sequelize, User } = require("./models");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const salonRoutes = require("./routes/salonRoutes");
const contactInquiryRoutes = require("./routes/contactInquiryRoutes");
const blogPostRoutes = require("./routes/blogPostRoutes");
const faqRoutes = require("./routes/faqRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const wishlistItemRoutes = require("./routes/wishlistItemRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const addressRoutes = require("./routes/addressRoutes");
const setupSwagger = require("./swagger/swagger");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", salonRoutes);
app.use("/api", contactInquiryRoutes);
app.use("/api", blogPostRoutes);
app.use("/api", faqRoutes);
app.use("/api", cartItemRoutes);
app.use("/api", wishlistItemRoutes);
app.use("/api", reviewRoutes);
app.use("/api", orderRoutes);
app.use("/api", orderItemRoutes);
app.use("/api", paymentRoutes);
app.use("/api", addressRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL Database connected successfully.");
        await sequelize.sync({ alter: true }).catch((syncErr) => {
            console.warn("Sequelize sync note:", syncErr.message);
        });
        console.log("Database schema synchronized.");

        const userCount = await User.count().catch(() => 0);
        if (userCount === 0) {
            await User.bulkCreate([
                {
                    full_name: "Admin Director",
                    email: "admin@chronos.uz",
                    phone: "+998901234567",
                    password_hash: "admin123",
                    role: "admin"
                },
                {
                    full_name: "Alisher Navoiy",
                    email: "alisher@aura.uz",
                    phone: "+998909876543",
                    password_hash: "user123",
                    role: "customer"
                }
            ], { individualHooks: true });
            console.log("PostgreSQL Initial users seeded successfully.");
        }
    } catch (error) {
        console.error("Database connection notice:", error.message);
    }

    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Xatolik: ${PORT}-port allaqachon band. Avvalgi ishlayotgan jarayonni to'xtating.`);
        } else {
            console.error(`Server xatosi:`, err.message);
        }
    });
};

startServer();
