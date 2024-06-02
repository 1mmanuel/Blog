const { test, describe, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const assert = require("node:assert");

describe("return 400 if title or url are missing", () => {
  test("responds with 400 if title is missing", async () => {
    const newBlog = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 10,
    };

    const response = await supertest(app).post("/api/blog").send(newBlog);

    assert.strictEqual(response.status, 400);
  });

  test("responds with 400 if url is missing", async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    };

    const response = await supertest(app).post("/api/blog").send(newBlog);

    assert.strictEqual(response.status, 400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
