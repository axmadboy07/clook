const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
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

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
