import React, { useState } from 'react'


function NewBlogForm({ createBlog }) {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleAddingNewBlog = async (e) => {
    e.preventDefault()
    await createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <p>Add a new blog:</p>
      <form onSubmit={handleAddingNewBlog} >
        <label htmlFor="title">title:</label>
        <input type="text" value={newBlog['title']} onChange={(e) => setNewBlog({ ...newBlog, 'title': e.target.value })} placeholder="Enter Title" name="title" id="new-blog-title" required/>

        <label htmlFor="author">author:</label>
        <input type="text" value={newBlog['author']} onChange={(e) => setNewBlog({ ...newBlog, 'author': e.target.value })} placeholder="Enter Author" name="author" id="new-blog-author" required/>

        <label htmlFor="url">url:</label>
        <input type="text" value={newBlog['url']} onChange={(e) => setNewBlog({ ...newBlog, 'url': e.target.value })} placeholder="Enter URL" name="url" id="new-blog-url" required/>

        <input className="submit-blog-btn" id="new-blog-submit" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default NewBlogForm
