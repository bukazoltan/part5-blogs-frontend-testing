import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, loggedInUser, deleteBlog, handleLikes }) => {
  const [fullyVisible, setFullyVisible] = useState(false)
  const showWhenVisible = { display: fullyVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisibility = () => {
    setFullyVisible(!fullyVisible)
  }

  const handleDeleteBlog = async () => {
    let confirmation = window.confirm('Are you sure you want to delete this blog?')
    if (confirmation) {
      await blogService.deleteOne(blog.id)
      deleteBlog(blog)
    }
  }

  const increaseLikes = async () => {
    handleLikes(blog.id)
  }

  return(
    <div style={blogStyle} className="blog-item">
      <div><span className="item-title">{blog.title}</span> - <span className="item-author">{blog.author}</span></div>
      <button className="blog-visibility-toggle-btn" onClick={handleVisibility}>view</button>
      <div style={showWhenVisible} className='additional-details'>
        <p className="item-url">{blog.url}</p>
        <p className="item-likes">likes: <span>{blog.likes}</span><button className="blog-like-btn" onClick={increaseLikes}>like</button></p>
        <p className="item-username">{blog?.user?.name}</p>
        {loggedInUser.id === blog?.user?.id || blog?.user ? <button className="blog-delete-btn" onClick={handleDeleteBlog}>Delete</button> : null}
      </div>
    </div>)
}

export default Blog