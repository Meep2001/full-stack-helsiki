const Blog = require("../models/blog");

const getAllBlogs = async () => {
  const blogs = await Blog.find({});
  return blogs;
};
const toBeAdded= {
    "title": "123456",
    "author": "123456789",
    "blogUrl": "ddgdfsdfsdfdsf",
    "votes": "12"
}
module.exports={getAllBlogs,toBeAdded}
