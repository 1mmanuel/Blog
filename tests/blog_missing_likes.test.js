const { test } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const blogs = {
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  __v: 0,
};

test("blog with the likes field missing will have a default value", () => {
  const result = listHelper.missingLike(blogs);
  assert.deepEqual(result, {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
    __v: 0,
  });
});
