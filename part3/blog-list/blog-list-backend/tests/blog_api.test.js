const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");
const supertest = require("supertest");

const api = supertest(app);
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("gets all notes in the db", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(response.body.length);
});

test("has id property", async () => {
  const blogs = await helper.getAllBlogs();
  expect(blogs[0].id).toBeDefined();
});

test("new blog added", async () => {
  const beforeAdding = await helper.getAllBlogs();
  const nBlog = helper.toBeAdded;
  await api.post("/api/blogs").send(nBlog);
  const afterAdding = await helper.getAllBlogs();
  expect(afterAdding).toHaveLength(beforeAdding.length + 1);
});

test("blog with votes missing to be added at votes=0", async () => {
  const blog = {
    title: "atg basics",
    author: "ooooooooo",
    blogUrl: "www.atg.com",
  };
  const response = await api.post("/api/blogs/").send(blog);

  expect(parseInt(response.body.votes)).toBe(0);
});

test("blog with votes missing title gives 400 status", async () => {
  const blog = {
    author: "ooooooooo",
    votes: 13,
  };
  const response = await api.post("/api/blogs/").send(blog).expect(400);
});

test("delete a note ", async () => {
  const toBeAdded = helper.toBeAdded;
  const response = await api.post("/api/blogs/").send(toBeAdded);
  const blog = response.body;
  await api.delete(`/api/blogs/${blog.id}`);
  //console.log(response)
  await api.get(`/api/blogs/${blog.id}`).expect(404);
});

test("votes to be updated", async () => {
  const blog = await api.post("/api/blogs/").send(helper.toBeAdded);
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    blogUrl: blog.blogUrl,
    likes: 0,
  };
  const response = await api.put(`/api/blogs/${blog.id}`).send(updatedBlog);
  const nBlog=response.body
  console.log(nBlog)
  expect(nBlog.votes).toBe(0);
});
//test("new blog added successfully")
// afterall(()=>{
//     mongoose.connection.close()
// })
