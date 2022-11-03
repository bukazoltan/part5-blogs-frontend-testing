import Blog from './Blog'

export default function BlogList({ blogs, removeBlogFromList, title, loggedInUser, handleLikes }) {

  return (
    <div>
      <h3>{title}</h3>
      {blogs.map(blog =>
        <Blog handleLikes={handleLikes} deleteBlog={removeBlogFromList} loggedInUser={loggedInUser} key={blog.id} blog={blog} />
      )}
    </div>
  )
}
