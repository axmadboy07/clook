const router = require("express").Router();
const wishlistItemController = require("../controller/wishlistItemController");

/**
 * @swagger
 * tags:
 *   name: WishlistItems
 *   description: Wishlist item management
 */

/**
 * @swagger
 * /wishlist-items:
 *   post:
 *     summary: Add an item to wishlist
 *     tags: [WishlistItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - product_id
 *             properties:
 *               user_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Wishlist item created successfully
 *       400:
 *         description: Invalid wishlist item data
 */
router.post("/wishlist-items", wishlistItemController.createWishlistItem);

/**
 * @swagger
 * /wishlist-items:
 *   get:
 *     summary: Get all wishlist items
 *     tags: [WishlistItems]
 *     responses:
 *       200:
 *         description: List of wishlist items
 */
router.get("/wishlist-items", wishlistItemController.getWishlistItems);

/**
 * @swagger
 * /wishlist-items/{id}:
 *   get:
 *     summary: Get a wishlist item by ID
 *     tags: [WishlistItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist item details
 *       404:
 *         description: Wishlist item not found
 */
router.get("/wishlist-items/:id", wishlistItemController.getWishlistItemById);

/**
 * @swagger
 * /wishlist-items/{id}:
 *   delete:
 *     summary: Delete a wishlist item
 *     tags: [WishlistItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wishlist item deleted successfully
 *       404:
 *         description: Wishlist item not found
 */
router.delete("/wishlist-items/:id", wishlistItemController.deleteWishlistItem);

module.exports = router;
