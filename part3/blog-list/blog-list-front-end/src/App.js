import { useEffect, useState } from "react";
import { AddBlogForm } from "./components/form/add-blog-form";
import { Blog } from "./components/blog/Blog";
import services from "./services/blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const hook = () => {
    services.getAllBlogs().then((blogs) => {
      setBlogs(blogs);
    });
  };
  useEffect(hook, []);
  return (
    <div className="App">
      <h1>Blog List</h1>
      <AddBlogForm setBlogs={setBlogs} blogs={blogs}/>
      <div className="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            title={blog.title}
            blogUrl={blog.blogUrl}
            author={blog.author}
            votes={blog.votes}
          ></Blog>
        ))}
      </div>
    </div>
  );
}

export default App;
