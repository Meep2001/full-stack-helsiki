import './blog.scss'
export function Blog({id,title,votes,author,blogUrl}) {
  return (
    <div className="blog" id={id}>
      <p className="header">{title}</p>
      <p className="author">{author}</p>
      <span className="url">{blogUrl}</span>
      <span className="votes">{votes}</span>
    </div>
  );
}
