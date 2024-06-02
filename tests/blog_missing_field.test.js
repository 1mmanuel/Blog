const { test, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../index");
const assert = require("node:assert");

const Blog = require("../models/blog");
const api = supertest(app);

describe("return 400 if title or url are missing", () => {
  test("responds with 400 if title is missing", async () => {
    const newBlog = {
      author: "John Doe",
      url: "https://example.com",
    };

    const response = await supertest(app).post("/api/blogs").send(newBlog);

    assert.strictEqual(response.status, 400);
  });

  test("responds with 400 if url is missing", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "John Doe",
    };

    const response = await supertest(app).post("/api/blogs").send(newBlog);

    assert.strictEqual(response.status, 400);
  });
});
