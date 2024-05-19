const _ = require("lodash");

const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  let currMaxLikes = 0;
  let favoriteBlog = null;

  blogs.forEach((blog) => {
    if (blog.likes > currMaxLikes) {
      currMaxLikes = blog.likes;
      favoriteBlog = {
        author: blog.author,
        title: blog.title,
        likes: blog.likes,
      };
    }
  });

  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  const authorGroup = _.groupBy(blogs, "author");
  const mostBlog = _.maxBy(
    Object.keys(authorGroup),
    (author) => authorGroup[author].length
  );

  return {
    author: mostBlog,
    blogs: authorGroup[mostBlog].length,
  };
};

const mostLikes = (blogs) => {
  const authorGroup = _.groupBy(blogs, "author");
  const mostLikes = _.maxBy(Object.keys(authorGroup), (author) => {
    return _.sumBy(authorGroup[author], "likes");
  });

  const totalLikes = _.sumBy(authorGroup[mostLikes], "likes");

  return {
    author: mostLikes,
    blogs: totalLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
