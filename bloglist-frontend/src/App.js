import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlog, deleteBlog, updateBlog } from './reducers/blogReducer'
import { setNotification, deleteNotification } from './reducers/notificatonReducer'
import { loggedIn, loggedOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedIn(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
      dispatch(loggedIn(userData))
      history.push('/')
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
    dispatch(loggedOut())
  }

  const handleNewBlog = async newBlog => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
      dispatch(initializeBlogs())
    } catch (exception) {
      dispatch(setNotification('Something has gone wrong. Please try posting again.'))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }

  const handleUpdateBlog = async (updatedBlog, blogId) => {
    try {
      dispatch(updateBlog(updatedBlog, blogId))
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
        dispatch(deleteBlog(blogId))
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