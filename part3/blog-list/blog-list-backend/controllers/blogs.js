const blogRouter = require("express").Router();
const logger = require("../utils/logger");
const { request, response } = require("express");
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    if (blogs) response.json(blogs);
    else response.json({ msg: "no blogs prest" });
  } catch (exception) {
    next(exception.message);
  }
  // Blog.find({})
  //   .then((blogs) => {
  //     if(blogs)
  //       response.json(blogs);
  //     else
  //       response.json({msg:'no blogs prest'})
  //   })
  //   .catch((error) => next(error.message));
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) return response.json(blog);
    else return response.status(404).end();
  } catch (error) {
    next(error.message);
  }
  // Blog.findById(id)
  //   .then((blog) => {
  //     if (blog) response.json(blog);
  //     else response.status(404).send(`Not found ${id}`);
  //   })
  //   .catch((error) => next(error.message));
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const votes = parseInt(body.votes);
  if (!body.title) return response.status(400).json({ message: "no title" });
  if (!body.blogUrl) return response.status(400).json({ message: "no url" });

  const blog = new Blog({
    title: body.title,
    author: body.author,
    blogUrl: body.blogUrl,
    likes: votes ? votes : 0,
  });

  logger.info("new blog to add", blog);
  try {
    const savedBlog = await blog.save();
    if (savedBlog) response.json(savedBlog);
  } catch (error) {
    next(error.message);
  }
  // blog
  //   .save()
  //   .then((savedBlog) => {
  //     response.json(savedBlog);
  //   })
  //   .catch((error) => next(error.message));
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const blog = request.body;
  const nVotes = parseInt(blog.votes);
  const id = request.params.id;
  const updatedBlog = new Blog({
    title: blog.title,
    author: blog.author,
    blogUrl: blog.blogUrl,
    likes: nVotes ? nVotes : 0,
  });
  try {
    const nBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
      new: true,
    });
    console.log(updatedBlog)
    return response.json(updatedBlog);
  } catch (error) {
    response.json(error)
    next(error.message);
  }

  // Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  //   .then((updatedBlog) => {
  //     response.json(updatedBlog);
  //   })
  //   .catch((error) => {response.json(updatedBlog);next(error)});
});
module.exports = blogRouter;
