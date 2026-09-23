const router = require("express").Router();
const orderItemController = require("../controller/orderItemController");

/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Order items management
 */

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Create an order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - product_id
 *               - unit_price
 *             properties:
 *               order_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 default: 1
 *               unit_price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order item created successfully
 *       400:
 *         description: Invalid order item data
 */
router.post("/order-items", orderItemController.createOrderItem);

/**
 * @swagger
 * /order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: List of order items
 */
router.get("/order-items", orderItemController.getOrderItems);

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Get an order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item details
 *       404:
 *         description: Order item not found
 */
router.get("/order-items/:id", orderItemController.getOrderItemById);

/**
 * @swagger
 * /order-items/{id}:
 *   put:
 *     summary: Update an order item
 *     tags: [OrderItems]
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
 *             properties:
 *               order_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               unit_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       404:
 *         description: Order item not found
 */
router.put("/order-items/:id", orderItemController.updateOrderItem);

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Delete an order item
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 */
router.delete("/order-items/:id", orderItemController.deleteOrderItem);

module.exports = router;
