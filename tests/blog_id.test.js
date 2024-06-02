const { test } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const blogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
];

test("returns true if the blog uses id instead of _id", () => {
  const result = listHelper.idTest(blogs);
  assert.deepStrictEqual(result, true);
});
