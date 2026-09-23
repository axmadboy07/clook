const router = require("express").Router();
const addressController = require("../controller/addressController");

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address management
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create an address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - city
 *               - street
 *               - phone
 *             properties:
 *               user_id:
 *                 type: string
 *               city:
 *                 type: string
 *               street:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Invalid address data
 */
router.post("/addresses", addressController.createAddress);

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: List of addresses
 */
router.get("/addresses", addressController.getAddresses);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Get an address by ID
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address details
 *       404:
 *         description: Address not found
 */
router.get("/addresses/:id", addressController.getAddressById);

/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Update an address
 *     tags: [Addresses]
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
 *               user_id:
 *                 type: string
 *               city:
 *                 type: string
 *               street:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       404:
 *         description: Address not found
 */
router.put("/addresses/:id", addressController.updateAddress);

/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted successfully
 *       404:
 *         description: Address not found
 */
router.delete("/addresses/:id", addressController.deleteAddress);

module.exports = router;
