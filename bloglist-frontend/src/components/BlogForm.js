/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import {
  Switch, Route
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Toggable from './Toggable'
import UsersTable from './UsersTable'
import BlogList from './BlogList'
import BlogInfo from './BlogInfo'

const BlogsForm = ({
  handleLogout,
  handleNewBlog,
  handleUpdateBlog,
  handleDelete,
}) => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
    <>
      <h2>blogs</h2>
      <h3 >{notification}</h3>
      <div>
        {user.name} has logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <br/>
      <Switch>
        <Route path='/blogs/:id'>
          <BlogInfo
            updateBlog={updateBlog}
            username={user.username}
            handleDelete={handleDelete}
          />
        </Route>
        <Route path='/users/:id'>
          <BlogList />
        </Route>
        <Route path='/users'>
          <UsersTable/>
        </Route>
        <Route path='/'>
          <div className="formDiv">
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
              />
            )}
          </div>
        </Route>
      </Switch>
    </>
  )
}

export default BlogsForm