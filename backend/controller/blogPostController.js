const { BlogPost } = require("../models");
const { validateBlogPost } = require("../validation/blogPostValidation");
const { Op } = require("sequelize");

exports.createBlogPost = async (req, res) => {
    const { error } = validateBlogPost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const blogPost = await BlogPost.create(req.body);
        res.status(201).send(blogPost);
    } catch (error) {
        res.status(500).send(error.message || error);
    }
};

exports.getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.findAll({});
        res.status(200).send(blogPosts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id);
        if (!blogPost) return res.status(404).send("Blog post not found");
        res.status(200).send(blogPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateBlogPost = async (req, res) => {
    const { error } = validateBlogPost(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const blogPost = await BlogPost.findByPk(req.params.id);
        if (!blogPost) return res.status(404).send("Blog post not found");

        await blogPost.update(req.body);
        res.status(200).send(blogPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findByPk(req.params.id);
        if (!blogPost) return res.status(404).send("Blog post not found");

        const blogPostData = blogPost.toJSON();
        await blogPost.destroy();
        res.status(200).send(blogPostData);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchBlogPosts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send("Query parameter is required");
        }
        const blogPosts = await BlogPost.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${query}%` } },
                    { content: { [Op.iLike]: `%${query}%` } },
                    { author: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });
        res.status(200).send(blogPosts);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
