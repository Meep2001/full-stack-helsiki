const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const mostLiked = (blogs) => {
  const sort = (a, b) => {
    return b.likes - a.likes;
  };
  blogs.sort(sort);
  return {
    author: blogs[0].author,
    likes: blogs[0].likes,
  };
};
module.exports = {
  dummy,
  totalLikes,
  mostLiked,
};
