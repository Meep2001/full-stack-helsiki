const blogRouter = require("express").Router();
const logger = require("../utils/logger");
const { request, response } = require("express");
const Blog = require("../models/blog");

blogRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      if(blogs)
        response.json(blogs);
      else
        response.json({msg:'no blogs prest'})
    })
    .catch((error) => next(error.message));
});

blogRouter.get("/:id", (request, response) => {
  Blog.findById(id)
    .then((blog) => {
      if (blog) response.json(blog);
      else response.status(404).send(`Not found ${id}`);
    })
    .catch((error) => next(error.message));
});

blogRouter.post("/", (request, response, next) => {
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    blogUrl: body.blogUrl,
    likes: parseInt(body.votes),
  });
  logger.info("new blog to add", blog);
  blog
    .save()
    .then((savedBlog) => {
      response.json(savedBlog);
    })
    .catch((error) => next(error.message));
});

module.exports =  blogRouter ;
