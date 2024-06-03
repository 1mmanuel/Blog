const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../index");
const assert = require("node:assert");

const api = supertest(app);

test("succeeds with status code 204 if id is valid", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blog/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

  const contents = blogsAtEnd.map((r) => r.title);
  assert(!contents.includes(blogToDelete.title));
});

after(async () => {
  await mongoose.connection.close();
});
