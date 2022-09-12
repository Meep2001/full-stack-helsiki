import { useState } from "react";
import blogService from "../services/blogs";
import "./add-blog-form.scss";

export function AddBlogForm() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [votes, setVotes] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    blogService.createBlog({}).then((response) => console.log(response))
    .catch(error=>console.log(error));
  };
  return (
    <form>
      <label>
        Author
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
      </label>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </label>
      <label>
        Blog URL
        <input
          type="text"
          value={blogUrl}
          onChange={(e) => setBlogUrl(e.target.value)}
        ></input>
      </label>
      <label>
        Votes
        <input
          type="text"
          value={votes}
          onChange={(e) => setVotes(e.target.value)}
        ></input>
      </label>
      <button onClick={(e) => handleAddBlog(e)}>Add</button>
    </form>
  );
}
