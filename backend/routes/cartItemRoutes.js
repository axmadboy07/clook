const router = require("express").Router();
const cartItemController = require("../controller/cartItemController");

/**
 * @swagger
 * tags:
 *   name: CartItems
 *   description: Cart item management
 */

/**
 * @swagger
 * /cart-items:
 *   post:
 *     summary: Add an item to cart
 *     tags: [CartItems]
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
 *               quantity:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       201:
 *         description: Cart item created successfully
 *       400:
 *         description: Invalid cart item data
 */
router.post("/cart-items", cartItemController.createCartItem);

/**
 * @swagger
 * /cart-items:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: List of cart items
 */
router.get("/cart-items", cartItemController.getCartItems);

/**
 * @swagger
 * /cart-items/{id}:
 *   get:
 *     summary: Get a cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item details
 *       404:
 *         description: Cart item not found
 */
router.get("/cart-items/:id", cartItemController.getCartItemById);

/**
 * @swagger
 * /cart-items/{id}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 */
router.put("/cart-items/:id", cartItemController.updateCartItem);

/**
 * @swagger
 * /cart-items/{id}:
 *   delete:
 *     summary: Delete a cart item
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 */
router.delete("/cart-items/:id", cartItemController.deleteCartItem);

module.exports = router;
