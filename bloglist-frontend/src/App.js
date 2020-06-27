import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification, deleteNotification } from './reducers/notificatonReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(initializeBlogs(blogs)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const userData = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(userData)
      )
      blogService.setToken(userData.token)
      setUser(userData)
      setUsername('')
      setPassword('')
    } catch (exception){
      dispatch(setNotification('Wrong username or password'))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleNewBlog = async newBlog => {
    try {
      const newBlogReponse = await blogService.create(newBlog)
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
      blogService.getAll().then(blogs =>
        dispatch(initializeBlogs(blogs))
      )
    } catch (exception) {
      dispatch(setNotification('Something has gone wrong. Please try posting again.'))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }

  const handleUpdateBlog = async (updatedBlog, blogId) => {
    try {
      const updatedBlogResponse = await blogService.update(updatedBlog, blogId)
      dispatch(initializeBlogs(blogs.map(blog => blog.id !== blogId ? blog : updatedBlogResponse)))
    } catch (exception) {
      dispatch(setNotification('Could not update. Please try posting again.'))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }

  const handleDelete = async (blogId, blog) => {
    try {
      const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if (confirmDelete) {
        await blogService.deleteBlog(blogId)
        dispatch(initializeBlogs(blogs.filter(blog => blog.id !== blogId)))
        dispatch(setNotification('Blog was successfully deleted.'))
        setTimeout(() => {
          dispatch(deleteNotification())
        }, 5000)
      }
    } catch (exception) {
      dispatch(setNotification('Could not delete. Please refresh and try again.'))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }

  return (
    <div>
      {user ?
        <BlogForm
          handleLogout={handleLogout}
          handleNewBlog={handleNewBlog}
          blogs={blogs}
          user={user}
          handleUpdateBlog={handleUpdateBlog}
          handleDelete={handleDelete}
        /> : <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      }
    </div>
  )
}

export default App