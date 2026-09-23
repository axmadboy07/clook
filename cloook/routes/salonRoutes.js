const router = require("express").Router();
const salonController = require("../controller/salonController");

/**
 * @swagger
 * tags:
 *   name: Salons
 *   description: Salon management
 */

/**
 * @swagger
 * /salons:
 *   post:
 *     summary: Create a salon
 *     tags: [Salons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - address
 *               - phone
 *             properties:
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Salon created successfully
 *       400:
 *         description: Invalid salon data
 */
router.post("/salons", salonController.createSalon);

/**
 * @swagger
 * /salons:
 *   get:
 *     summary: Get all salons
 *     tags: [Salons]
 *     responses:
 *       200:
 *         description: List of salons
 */
router.get("/salons", salonController.getSalons);

/**
 * @swagger
 * /salons/search:
 *   get:
 *     summary: Search salons by city, address or phone
 *     tags: [Salons]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching salons
 *       400:
 *         description: Query parameter is required
 */
router.get("/salons/search", salonController.searchSalons);

/**
 * @swagger
 * /salons/{id}:
 *   get:
 *     summary: Get a salon by ID
 *     tags: [Salons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salon details
 *       404:
 *         description: Salon not found
 */
router.get("/salons/:id", salonController.getSalonById);

/**
 * @swagger
 * /salons/{id}:
 *   put:
 *     summary: Update a salon
 *     tags: [Salons]
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
 *               - city
 *               - address
 *               - phone
 *             properties:
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Salon updated successfully
 *       404:
 *         description: Salon not found
 */
router.put("/salons/:id", salonController.updateSalon);

/**
 * @swagger
 * /salons/{id}:
 *   delete:
 *     summary: Delete a salon
 *     tags: [Salons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salon deleted successfully
 *       404:
 *         description: Salon not found
 */
router.delete("/salons/:id", salonController.deleteSalon);

module.exports = router;
