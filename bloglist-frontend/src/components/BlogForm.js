/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import Toggable from './Toggable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersDataReducer'

const BlogsForm = ({
  handleLogout,
  handleNewBlog,
  handleUpdateBlog,
  handleDelete,
}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const usersData = useSelector(state => state.usersData)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    dispatch(initializeUsers())
  }, [blogs.length])

  const createNewBlog = event => {
    event.preventDefault()
    handleNewBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const updateBlog = (event, blogObject, blogId) => {
    event.preventDefault()
    handleUpdateBlog(blogObject, blogId)
  }

  return (
    <div className="formDiv">
      <h2>blogs</h2>
      <h3 >{notification}</h3>
      <div>
        {user.name} has logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br/>
      <Toggable buttonLabel='new blog'>
        <h2>create new</h2>
        <form onSubmit={createNewBlog} >
          <div>
                title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} id="title"/>
          </div>
          <div>
                author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} id="author"/>
          </div>
          <div>
                url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} id="url"/>
          </div>
          <button type="submit" id="createButton">create</button>
        </form>
      </Toggable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          username={user.username}
          handleDelete={handleDelete}
        />
      )}
      <div>
        <table style={{ width: '300px' }}>
          <thead>
            <tr>
              <th align='left' ><h2>Users</h2></th>
              <th align='left' ><h2>blogs created</h2></th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlogsForm