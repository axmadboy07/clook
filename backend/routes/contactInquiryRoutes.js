const router = require("express").Router();
const contactInquiryController = require("../controller/contactInquiryController");

/**
 * @swagger
 * tags:
 *   name: ContactInquiries
 *   description: Contact inquiries management
 */

/**
 * @swagger
 * /contact-inquiries:
 *   post:
 *     summary: Create a contact inquiry
 *     tags: [ContactInquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salon_id
 *               - name
 *               - email
 *               - message
 *             properties:
 *               salon_id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inquiry created successfully
 *       400:
 *         description: Invalid inquiry data
 */
router.post("/contact-inquiries", contactInquiryController.createContactInquiry);

/**
 * @swagger
 * /contact-inquiries:
 *   get:
 *     summary: Get all contact inquiries
 *     tags: [ContactInquiries]
 *     responses:
 *       200:
 *         description: List of contact inquiries
 */
router.get("/contact-inquiries", contactInquiryController.getContactInquiries);

/**
 * @swagger
 * /contact-inquiries/search:
 *   get:
 *     summary: Search contact inquiries by name, email or message
 *     tags: [ContactInquiries]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching contact inquiries
 *       400:
 *         description: Query parameter is required
 */
router.get("/contact-inquiries/search", contactInquiryController.searchContactInquiries);

/**
 * @swagger
 * /contact-inquiries/{id}:
 *   get:
 *     summary: Get a contact inquiry by ID
 *     tags: [ContactInquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact inquiry details
 *       404:
 *         description: Contact inquiry not found
 */
router.get("/contact-inquiries/:id", contactInquiryController.getContactInquiryById);

/**
 * @swagger
 * /contact-inquiries/{id}:
 *   put:
 *     summary: Update a contact inquiry
 *     tags: [ContactInquiries]
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
 *               - salon_id
 *               - name
 *               - email
 *               - message
 *             properties:
 *               salon_id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact inquiry updated successfully
 *       404:
 *         description: Contact inquiry not found
 */
router.put("/contact-inquiries/:id", contactInquiryController.updateContactInquiry);

/**
 * @swagger
 * /contact-inquiries/{id}:
 *   delete:
 *     summary: Delete a contact inquiry
 *     tags: [ContactInquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact inquiry deleted successfully
 *       404:
 *         description: Contact inquiry not found
 */
router.delete("/contact-inquiries/:id", contactInquiryController.deleteContactInquiry);

module.exports = router;
