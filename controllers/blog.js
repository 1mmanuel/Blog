const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: "Title and url are required" });
  }

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const blogs = await Blog.findById(id);
  response.json(blogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const blogs = await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;
