const router = require("express").Router();
const paymentController = require("../controller/paymentController");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - method
 *               - amount
 *             properties:
 *               order_id:
 *                 type: string
 *               method:
 *                 type: string
 *               status:
 *                 type: string
 *                 default: pending
 *               amount:
 *                 type: number
 *               paid_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Invalid payment data
 */
router.post("/payments", paymentController.createPayment);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of payments
 */
router.get("/payments", paymentController.getPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
router.get("/payments/:id", paymentController.getPaymentById);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment
 *     tags: [Payments]
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
 *               method:
 *                 type: string
 *               status:
 *                 type: string
 *               amount:
 *                 type: number
 *               paid_at:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
router.put("/payments/:id", paymentController.updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete("/payments/:id", paymentController.deletePayment);

module.exports = router;
