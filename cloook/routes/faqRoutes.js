const router = require("express").Router();
const faqController = require("../controller/faqController");

/**
 * @swagger
 * tags:
 *   name: FAQs
 *   description: FAQ management
 */

/**
 * @swagger
 * /faqs:
 *   post:
 *     summary: Create an FAQ
 *     tags: [FAQs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *       400:
 *         description: Invalid FAQ data
 */
router.post("/faqs", faqController.createFaq);

/**
 * @swagger
 * /faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [FAQs]
 *     responses:
 *       200:
 *         description: List of FAQs
 */
router.get("/faqs", faqController.getFaqs);

/**
 * @swagger
 * /faqs/search:
 *   get:
 *     summary: Search FAQs by question or answer
 *     tags: [FAQs]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching FAQs
 *       400:
 *         description: Query parameter is required
 */
router.get("/faqs/search", faqController.searchFaqs);

/**
 * @swagger
 * /faqs/{id}:
 *   get:
 *     summary: Get an FAQ by ID
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: FAQ details
 *       404:
 *         description: FAQ not found
 */
router.get("/faqs/:id", faqController.getFaqById);

/**
 * @swagger
 * /faqs/{id}:
 *   put:
 *     summary: Update an FAQ
 *     tags: [FAQs]
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
 *               - question
 *               - answer
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *       404:
 *         description: FAQ not found
 */
router.put("/faqs/:id", faqController.updateFaq);

/**
 * @swagger
 * /faqs/{id}:
 *   delete:
 *     summary: Delete an FAQ
 *     tags: [FAQs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *       404:
 *         description: FAQ not found
 */
router.delete("/faqs/:id", faqController.deleteFaq);

module.exports = router;
