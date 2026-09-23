const Joi = require("joi");

const validateBlogPost = (blogPost) => {
    const Schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(5).required(),
        author: Joi.string().min(2).required()
    });
    return Schema.validate(blogPost);
};

module.exports = { validateBlogPost };
