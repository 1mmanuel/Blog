const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../index");
const assert = require("node:assert");

const Blog = require("../models/blog");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "Canonical class Canonical",
    author: "Robert C. Dijkstra",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 12,
  };

  await api
    .post("/api/blog")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);

  assert(contents.includes("Canonical class Canonical"));
});

after(async () => {
  await mongoose.connection.close();
});
