const router = require("express").Router();
const blogPostController = require("../controller/blogPostController");

/**
 * @swagger
 * tags:
 *   name: BlogPosts
 *   description: Blog post management
 */

/**
 * @swagger
 * /blog-posts:
 *   post:
 *     summary: Create a blog post
 *     tags: [BlogPosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Invalid blog post data
 */
router.post("/blog-posts", blogPostController.createBlogPost);

/**
 * @swagger
 * /blog-posts:
 *   get:
 *     summary: Get all blog posts
 *     tags: [BlogPosts]
 *     responses:
 *       200:
 *         description: List of blog posts
 */
router.get("/blog-posts", blogPostController.getBlogPosts);

/**
 * @swagger
 * /blog-posts/search:
 *   get:
 *     summary: Search blog posts by title, content or author
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching blog posts
 *       400:
 *         description: Query parameter is required
 */
router.get("/blog-posts/search", blogPostController.searchBlogPosts);

/**
 * @swagger
 * /blog-posts/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post details
 *       404:
 *         description: Blog post not found
 */
router.get("/blog-posts/:id", blogPostController.getBlogPostById);

/**
 * @swagger
 * /blog-posts/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [BlogPosts]
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
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       404:
 *         description: Blog post not found
 */
router.put("/blog-posts/:id", blogPostController.updateBlogPost);

/**
 * @swagger
 * /blog-posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *       404:
 *         description: Blog post not found
 */
router.delete("/blog-posts/:id", blogPostController.deleteBlogPost);

module.exports = router;
