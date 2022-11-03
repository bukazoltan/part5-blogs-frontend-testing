import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoggedInUser from './components/LoggedInUser'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const sendLoginRequest = async (username, password) => {
    try {
      const credentials = { username, password }
      let user = await loginService.login(credentials)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (err) {
      setMessage({ 'messageType': 'error', 'text': err.response.data.error })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const increaseBlogLikes = async (blogId) => {
    const indexToUpdate = blogs.findIndex((currentBlog) => currentBlog.id === blogId)
    const updatedBlogList = [...blogs]
    const updatedBlog =  blogs[indexToUpdate]
    updatedBlog['likes'] = updatedBlog['likes'] + 1
    updatedBlogList[indexToUpdate] = updatedBlog
    setBlogs(updatedBlogList)
    await blogService.update(blogId, updatedBlog)
  }

  const removeBlogFromList = (blogToRemove) => {
    let blogListWithoutRemoved = blogs.filter((blog) => blog.id !== blogToRemove.id)
    setBlogs(blogListWithoutRemoved)
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser('')
  }

  const addNewBlog = async (blogObject) => {
    try {
      let addedBlog = await blogService.create(blogObject)
      let blogsIncludingNew = [...blogs, addedBlog]
      setBlogs(blogsIncludingNew)
    } catch(err) {
      setMessage({ 'messageType': 'error', 'text': err.response.data.error })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      {message ? <div id="error-message" style={{ 'color': 'red' }}>{message.text}</div> : null}
      {
        !user ? <LoginForm sendLoginRequest={sendLoginRequest} />
          :
          <div>
            <div>
              <LoggedInUser user={user} handleLogout={handleLogout}/>
              <Togglable buttonId="new-note-toggle" buttonLabel='Add new note...'>
                <NewBlogForm createBlog={addNewBlog}/>
              </Togglable>
            </div>
            <BlogList handleLikes={increaseBlogLikes} removeBlogFromList={removeBlogFromList} loggedInUser={user} blogs={blogs.sort((a, b) => b.likes - a.likes)} title="Current blogs"/>
          </div>
      }
    </div>
  )
}

export default App
