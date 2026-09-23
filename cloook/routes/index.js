const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const salonRoutes = require("./salonRoutes");
const contactInquiryRoutes = require("./contactInquiryRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const faqRoutes = require("./faqRoutes");
const cartItemRoutes = require("./cartItemRoutes");
const wishlistItemRoutes = require("./wishlistItemRoutes");
const reviewRoutes = require("./reviewRoutes");
const orderRoutes = require("./orderRoutes");
const orderItemRoutes = require("./orderItemRoutes");
const paymentRoutes = require("./paymentRoutes");
const addressRoutes = require("./addressRoutes");

router.use(userRoutes);
router.use(categoryRoutes);
router.use(productRoutes);
router.use(salonRoutes);
router.use(contactInquiryRoutes);
router.use(blogPostRoutes);
router.use(faqRoutes);
router.use(cartItemRoutes);
router.use(wishlistItemRoutes);
router.use(reviewRoutes);
router.use(orderRoutes);
router.use(orderItemRoutes);
router.use(paymentRoutes);
router.use(addressRoutes);

module.exports = router;
